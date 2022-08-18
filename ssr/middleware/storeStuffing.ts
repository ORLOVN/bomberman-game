import {Request} from "express";
import createStore, {authApiService, forumApiService, themeApiService} from "@/store";
import {Roles} from "@/enums";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import {setSSRMode} from "@/store/slices";

const storeStuffing = async (req: Request) => {

  const store = createStore(undefined, req);

  store.dispatch(setSSRMode())

  await store.dispatch(authApiService.endpoints.getUserInfo.initiate());

  const state = store.getState();

  if (state.auth.role === Roles.user) {
    await store.dispatch(themeApiService.endpoints.getUserTheme.initiate(state.auth.user.id));
    await store.dispatch(forumApiService.endpoints.getTopics.initiate());
    const [forum, topic, topicId] = req.path.split('/').slice(-3);
    if (forum === "forum" && topic === "topic") {
      await store.dispatch(forumApiService.endpoints.getTopic.initiate(topicId));
    }
    await store.dispatch(leaderBoardApiService.endpoints.getScoreEntries.initiate({
      ratingFieldName: "score",
      cursor: state.leaderBoard.cursorPosition,
      limit: state.leaderBoard.step,
    }))


  }

  await Promise.all(authApiService.util.getRunningOperationPromises());


  return store;
}

export default storeStuffing;

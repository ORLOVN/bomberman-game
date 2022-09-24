export default class FullscreenService {
  static toggle(element: HTMLElement): void {
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}

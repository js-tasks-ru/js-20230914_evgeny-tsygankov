const DEFAULT_DURATION = 2000;
const SUCCESS_TYPE = "success";
const ERROR_TYPE = "error";

export default class NotificationMessage {
  #message;
  #duration;
  #type;
  #timer;

  element;

  /**
   * @param {string} message
   * @param {{ duration: number; type: typeof SUCCESS_TYPE | typeof ERROR_TYPE }}
   */
  constructor(message, { duration = DEFAULT_DURATION, type = "success" } = {}) {
    this.#message = message;
    this.#duration = duration;
    this.#type = type;

    this.render();
  }

  get duration() {
    return this.#duration;
  }
  /**
   * @param {number} ms
   * @returns {number}
   */
  convertMsToSeconds(ms) {
    return ms / 1000;
  }

  setNotificationStyle() {
    return `--value:${`${this.convertMsToSeconds(this.duration)}
      s`}"`;
  }

  setNotificationClassName() {
    return `"notification ${this.#type}"`;
  }

  createTemplate() {
    return `
        <div class=${this.setNotificationClassName()} style=${this.setNotificationStyle()}>
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">Notification</div>
                <div class="notification-body">
                  ${this.#message}
                </div>
            </div>
        </div>
    `;
  }

  /**
   * @returns {void}
   */
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.createTemplate();
    this.element = element.firstElementChild;
  }
  /**
   * @param {HTMLElement | undefined} element
   * @returns {void}
   */
  show(element) {
    const parendELement = element ? element : document.body;
    parendELement.append(this.element);

    this.#timer = setTimeout(() => {
      this.remove();
    }, this.#duration);
  }
  /**
   * @returns {void}
   */
  remove() {
    const element = this.element;
    element && element.remove();
  }
  /**
   * @returns {void}
   */
  destroy() {
    this.remove();
    this.element = null;

    const timer = this.#timer;
    timer && clearTimeout(timer);
  }
}

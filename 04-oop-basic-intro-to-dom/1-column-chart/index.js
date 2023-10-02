import { getColumnProps } from "../_utils/get-column-props";
import { CHART_HEIGHT } from "../_constants";

export default class ColumnChart {
  #chartHeight = CHART_HEIGHT;
  #data;
  #label;
  #value;
  #link;

  element;

  /**
   * @param {{
   *  data: number[];
   *  label: string;
   *  value: number;
   * 	formatHeading?: (value: string) => string;
   * }} props
   */
  constructor(props = {}) {
    const {
      data = [],
      value = 0,
      label = "",
      link = "#",
      formatHeading = (value) => value,
    } = props;

    this.#data = data;
    this.#label = label;
    this.#value = value;
    this.#link = link;
    this.formatHeading = formatHeading;

    this.render();
  }

  get chartHeight() {
    return this.#chartHeight;
  }
  get label() {
    return this.#label;
  }

  /**
   * @returns {string}
   */
  createLinkTempalate() {
    const link = this.#link;
    return link
      ? `<a href="${link}" class="column-chart__link">View all</a>`
      : "";
  }
  /**
   * @returns {string}
   */
  setChartHeaderContent() {
    return this.formatHeading(this.#value);
  }
  /**
   * @returns {string | null}
   */
  creteChartTemplate() {
    const data = this.#data;
    if (data.length) {
      const columansData = getColumnProps(data, this.#chartHeight);
      return columansData
        .map(
          ({ value, percent }) =>
            `<div style="--value: ${value}" data-tooltip=${percent}></div>`
        )
        .join("");
    }
    return null;
  }

  createTitleTemplate() {
    return `
			<div class="column-chart__title">
					${this.#label}
					${this.createLinkTempalate()}
			</div>
		`;
  }

  createCharConnetTemplate() {
    return `
			<div data-element="header" class="column-chart__header">${this.setChartHeaderContent()}</div>
				<div data-element="body" class="column-chart__chart">
					${this.creteChartTemplate()}					
				</div>
			</div>
		`;
  }

  createTemplate() {
    return `
			<div class="column-chart" style="--chart-height: ${this.chartHeight}">
				${this.createTitleTemplate()}
				<div class="column-chart__container">
					${this.createCharConnetTemplate()}
			</div>
		`;
  }
  /**
   * @returns {void}
   */
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.createTemplate();

    const { firstElementChild } = element;

    if (!this.#data.length) {
      firstElementChild.classList.add("column-chart_loading");
    }
    this.element = firstElementChild;
  }
  /**
   * @param {number[]} updatedDate
   * @returns {void}
   */
  update(updatedDate) {
    this.#data = updatedDate;
    this.element.innerHTML = this.creteChartTemplate();
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
  }
}

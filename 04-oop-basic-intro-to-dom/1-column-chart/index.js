const CHART_HEIGHT = 50;

export default class ColumnChart {
  chartHeight = CHART_HEIGHT;
  element;

  /**
   * @param {{
   *  data: number[];
   *  label: string;
   *  value: number;
   * 	formatHeading?: (value: number) => string;
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

    this.data = data;
    this.value = value;
    this.label = label;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
  }

  /**
   * @returns {Array<{ percent: string; value: string }>}
   */
  getColumnProps() {
    const data = this.data;
    const chartHeigh = this.chartHeight;

    const maxValue = Math.max(...data);
    const scale = chartHeigh / maxValue;

    return data.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + "%",
        value: String(Math.floor(item * scale)),
      };
    });
  }

  createLinkTempalate() {
    const link = this.link;
    return link
      ? `<a href="${link}" class="column-chart__link">View all</a>`
      : "";
  }

  setHeaderContent() {
    return this.formatHeading(this.value);
  }

  creteChartTemplate() {
    if (this.data.length) {
      const columansData = this.getColumnProps(this.data, this.chartHeight);
      return columansData
        .map(
          ({ value, percent }) =>
            `<div style="--value: ${value}" data-tooltip=${percent}></div>`
        )
        .join("");
    }
  }

  createTemplate() {
    return `
			<div class="column-chart" style="--chart-height: ${this.chartHeight}">
				<div class="column-chart__title">
					${this.label}
					${this.createLinkTempalate()}
				</div>
				<div class="column-chart__container">
				<div data-element="header" class="column-chart__header">${this.setHeaderContent()}</div>

					<div data-element="body" class="column-chart__chart">
						${this.creteChartTemplate()}
					</div>
				</div>
			</div>
		`;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.createTemplate();

    const firstElementChild = element.firstElementChild;

    if (!this.data.length) {
      firstElementChild.classList.add("column-chart_loading");
    }

    this.element = firstElementChild;
  }

  /**
   * @param {string[]} updatedDate
   * @returns {void}
   */
  update(updatedDate) {
    this.data = updatedDate;
    this.element.innerHTML = this.creteChartTemplate();
  }

  remove() {
    const element = this.element;
    element && element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

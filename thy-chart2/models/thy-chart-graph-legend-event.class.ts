import { Series } from 'highcharts';

export class ThyChartGraphLegendEvent {
    /**
     * Event type.
     */
    public type: string;
    /**
     * Related browser event.
     */
    public browserEvent: PointerEvent;
    /**
     * Prevent the default action of toggle the visibility of the series.
     */
    public preventDefault: Function;
    /**
     * Related series.
     */
    public target: Series;

    constructor(event: Highcharts.SeriesLegendItemClickEventObject) {
        this.type = event.type;
        this.browserEvent = event.browserEvent;
        this.preventDefault = event.preventDefault;
        this.target = event.target;
    }
}

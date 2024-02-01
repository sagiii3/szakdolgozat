import { ActivityWrapData } from "./activityWrapData";

export class groupedVerticalBarChartData{
    name: string;
    series: ActivityWrapData[];

    constructor(name: string, series: ActivityWrapData[]){
        this.name = name;
        this.series = series;
    }
}
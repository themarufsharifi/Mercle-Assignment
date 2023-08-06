import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { channels } from "../raw-data/channels";
import { messageCountList } from "../raw-data/message-count-list";
import { engagementMessageOverTimeChartOptions } from "../helper/EngagementHelper";

export const EngagementMessagesOverTime = ({}) => {
  const options = engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

import { format } from "./format";
import { getMillisecondsOfEveryHour } from "./get-milliseconds";

export const engagementMessageOverTimeChartOptions = (
  messageCountList,
  channels
) => {
  const channelDataByDate = {};
  messageCountList.forEach((message) => {
    const { channelId, timeBucket, count } = message;
    channelDataByDate[channelId] = channelDataByDate[channelId] || {};
    channelDataByDate[channelId][timeBucket] =
      (channelDataByDate[channelId][timeBucket] || 0) + parseInt(count);
  });

  const filteredChannels = channels.filter((channel) => {
    const channelId = channel.value;
    let channelDates = [];
    if (channelDataByDate[channelId]) {
      channelDates = Object.keys(channelDataByDate[channelId]);
    }
    return channelDates.length > 1;
  });

  const uniqueDates = Array.from(
    new Set(
      filteredChannels.flatMap((channel) =>
        Object.keys(channelDataByDate[channel.value])
      )
    )
  );

  const seriesData = filteredChannels.map((channel) => {
    const channelId = channel.value;
    const data = [];
    uniqueDates.forEach((date) => {
      const count = channelDataByDate[channelId][date] || 0;
      data.push(...getMillisecondsOfEveryHour(date, count));
    });

    return {
      name: channel.name,
      data,
    };
  });

  const options = {
    chart: {
      type: "spline",
      backgroundColor: "#22222c",
    },
    title: {
      text: "Engagement - Message Count Over Time",
      style: {
        color: "#fafafa",
      },
    },
    credits: {
      href: "https://mercle.xyz/",
      text: "Mecle",
    },
    colors: ["#1B5A5C"],
    tooltip: {
      useHTML: true,
      padding: 0,
      borderWidth: 1,
      borderColor: "#1B5A5C",
      borderRadius: 4,
      backgroundColor: "#0d0d0f",
      style: {
        color: "#FFFFFF",
        fontSize: "12px",
      },
      formatter() {
        const formattedDate = format(this.x);
        return `
          <div style="padding: 8px">
            <span style="font-size: 14px; font-weight: bold;">${this.series.name}</span><br>
            <span>${this.y} message on ${formattedDate}</span>
          </div>
        `;
      },
    },
    xAxis: {
      type: "datetime",
      lineColor: "#3D3D45",
      tickColor: "#3D3D45",
      crosshair: {
        width: 1,
      },
      labels: {
        style: { color: "#3D3D45" },
        formatter() {
          return format(this.value);
        },
      },
    },
    legend: {
      itemStyle: {
        color: "#fafafa",
      },
      itemHoverStyle: {
        color: "#3D3D45",
      },
    },
    yAxis: {
      title: {
        text: "Message Count",
        style: {
          color: "#fafafa",
        },
      },
      labels: {
        style: {
          color: "#3D3D45",
        },
      },
      gridLineWidth: 0,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: seriesData,
  };

  return options;
};

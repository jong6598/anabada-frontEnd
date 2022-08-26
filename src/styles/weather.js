/* 
  -하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
  -강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
  */
/**
 * 하늘이 흐리다(4) - {
 *   없음 : 그냥 구름,
 *   비 : 구름+비,
 *   비/눈 : 구름+비/눈,
 *   소나기 : 소나기 => 비구름
 * }
 *
 * 구름많음 : - {
 *  없음 : 해/달 있는 구름,
 *  비가 좀 옴 : 해/달 있는 비,
 *  눈이 좀 옴 : 해/달 있는 눈
 * }
 * 맑음 : 그냥 맑음
 */

const checkedWeather = (sky, pty) => {
  const requestDate = new Date();
  const currHour = requestDate.getHours();
  // 저녁
  if (currHour >= 18 || currHour < 6) {
    // 맑을 때
    if (Number(sky) === 1) {
      switch (Number(pty)) {
        case 0:
          return "/weatherIcons/clear_night.svg";
        default:
          return;
      }
    }
    // 구름 많음
    else if (Number(sky) === 3) {
      switch (Number(pty)) {
        case 0:
          return "/weatherIcons/cloudy_night_normal.svg";
        case 1:
          return "/weatherIcons/cloudy_night_rain.svg";
        case 3:
          return "/weatherIcons/cloudy_night_snow.svg";
        default:
          return;
      }
    }
    // 흐림
    else if (Number(sky) === 4) {
      switch (Number(pty)) {
        case 0:
          return "/weatherIcons/rainy_normal.svg";
        case 1:
          return "/weatherIcons/rainy_rain.svg";
        case 2:
          return "/weatherIcons/rainy_snowandrain.svg";
        case 3:
          return "/weatherIcons/rainy_snow.svg";
        default:
          return;
      }
    }
  }
  // 낮
  else {
    if (Number(sky) === 1) {
      switch (Number(pty)) {
        case 0:
          return "/weatherIcons/clear_day.svg";
        default:
          return;
      }
    }
    // 구름 많음
    else if (Number(sky) === 3) {
      switch (Number(pty)) {
        case 0:
          return "/weatherIcons/cloudy_day_normal.svg";
        case 1:
          return "/weatherIcons/cloudy_day_rain.svg";
        case 3:
          return "/weatherIcons/rainy_snow.svg";
        default:
          return;
      }
    }
    // 흐림
    else if (Number(sky) === 4) {
      switch (Number(pty)) {
        case 0:
          return "/weatherIcons/rainy_normal.svg";
        case 1:
          return "/weatherIcons/rainy_rain.svg";
        case 2:
          return "/weatherIcons/rainy_snowandrain.svg";
        case 3:
          return "/weatherIcons/rainy_snow.svg";
        default:
          return;
      }
    }
  }
};

export default checkedWeather;

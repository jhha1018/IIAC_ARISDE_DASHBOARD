function gridboxitemmaker(target, name, divname){
   $(target).addClass("gridbox");
   $(target).append('<div class="gridboxitem '+divname+'_ct1">'+name+'</div><div id="'+divname+'" class="gridboxitem"></div>');
}
function gridboxitemmaker2(target, name, divname){
   $(target).addClass("gridbox");
   $(target).append('<div style="display:flex; justify-content:space-between;align-items:center"><div id="'+target+'t1" class="gridboxitem">'+name+'</div><div id="'+target+'t2" class="gridboxitem2">0건</div></div><div id="'+divname+'" class="gridboxitem"></div>');
}
function getObjectKeys(data){
   return Object.keys(data);
}
function targetgraph1(targetId, data, category, variable){
   let layoutStr = 
   '<rMateChart  borderStyle="none">'
     +'<Options>'
        +'<Caption text="'+variable.title[0]+'"/>'
      +'</Options>'
   +'<RadarChart isSeriesOnAxis="false" type="polygon" paddingTop="20" paddingBottom="10	" startAngle="270" showDataTips="true" mouseSensitivity="6">'
   /*
    Radar 차트 생성시에 필요한 RadarChart 정의합니다
    showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
      isSeriesOnAxis : 차트 시리즈가 radialAxis위에 표현될지 여부를 나타냅니다
      type - circle, polygon : Rader차트의 타입(원형, 다각형)입니다
      이 예제에서는 polygon입니다
    */
        +'<radialAxis>'
             +'<LinearAxis maximum="100" interval="25" id="rAxis"/>'
         +'</radialAxis>'
        +'<angularAxis>'
            +'<CategoryAxis id="aAxis" categoryField="'+category[0]+'" displayName="Category"/>'
       +'</angularAxis>'
       +'<radialAxisRenderers>'
         /* radialAxis렌더러 정의 */
        /* 가로, 세로축 모두 표시 */
              //+'<Axis2DRenderer axis="{rAxis}" horizontal="true" visible="true" tickPlacement="outside"/>'
            +'<Axis2DRenderer axis="{rAxis}" horizontal="false" visible="false" tickPlacement="outside"/>'
       +'</radialAxisRenderers>'
       +'<angularAxisRenderers>'
           +'<AngularAxisRenderer axis="{aAxis}"/>'
        +'</angularAxisRenderers>'
        +'<series>'
        //radius 가 0일때 selectionRadius 가 작동 안됨
       +'<RadarSeries radius="1" field="'+category[3]+'" displayName="Consumption" selectionRadius="20">'
            +'<lineStroke>'
                 +'<Stroke color="'+variable.strokeColor[0]+'" weight="2"/>'
             +'</lineStroke>'
            +'<areaFill>'
               +'<SolidColor color="'+variable.fillColor[0]+'" alpha="0.2"/>'
            +'</areaFill>'
            
          /* RadarChart 정의 후 RadarSeries 정의합니다 */
           +'<showDataEffect>'
                     /*  차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                 +'<SeriesInterpolate/>'
             /*
            SeriesInterpolate는 시리즈 데이터가 새로운 시리즈 데이터로 표시될 때 이동하는 효과를 적용합니다
             - 공통속성 -
              elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
            minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
                         이 값보다 짧은 시간에 effect가 실행되지 않습니다
           offset : effect개시의 지연시간을 설정합니다 default:0
              perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
             */
            +'</showDataEffect>'
        +'</RadarSeries>'
     +'</series>'
  +'</RadarChart>'
+'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data,
      });
}
function targetgraph2(targetId, data, category, variable){
   
   //표현 준비 변수
   let color = "";
   let text = "";
   let percentage = Number((data[0][category[1]] / data[1][category[1]]*100).toFixed());
   let data2 = JSON.parse(JSON.stringify(data));
   data2[1][category[1]] = data2[1][category[1]] - data2[0][category[1]];
   if(percentage <= 80){
      color = variable.color[0];
      text = variable.text[0];
   }else{
      color = variable.color[1];
      text = variable.text[1];
   }
   
   let layoutStr = '<rMateChart borderStyle="none">'
         +'<Options>'
      +'</Options>'
    +'<Pie2DChart innerRadius="0.55" showDataTips="true" selectionMode="single">'
 /*
 Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
   innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
         +'<series>'
              +'<Pie2DSeries nameField="'+category[0]+'" field="'+category[1]+'" startAngle="270" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
                 +'<fills>'
                       +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                 +'</fills>'
              /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                  +'<showDataEffect>'
                  /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                       +'<SeriesZoom duration="1000"/>'
 /*
 SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
- 공통속성 -
   elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
 minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
              이 값보다 짧은 시간에 effect가 실행되지 않습니다
offset : effect개시의 지연시간을 설정합니다 default:0
   perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
  - SeriesZoom속성 -
   relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
   horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
 verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
   */
                 +'</showDataEffect>'
             +'</Pie2DSeries>'
        +'</series>'
         +'<backgroundElements>'	
              +'<CanvasElement>'
                   +'<CanvasLabel text="'+text+'" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="'+color+'" backgroundAlpha="0"/>'
                +'<CanvasLabel text="('+percentage+'%)" height="24" horizontalCenter="0" verticalCenter="10" fontSize="8" color="#666666" backgroundAlpha="0"/>'
            +'</CanvasElement>'
          +'</backgroundElements>'
     +'</Pie2DChart>'
 +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2,
      });
}
function targetgraph3(targetId, data, category, variable){
   //Annual Report
   
   
   let percentage = Number((data[0][category[1]] / data[1][category[1]]*100).toFixed());
   let data2 = JSON.parse(JSON.stringify(data));
   data2[1][category[1]] = data2[1][category[1]] - data2[0][category[1]];
   
   let layoutStr = '<rMateChart borderStyle="none">'
         +'<Options>'
      +'</Options>'
    +'<Pie2DChart innerRadius="0.8" showDataTips="true" selectionMode="single">'
 /*
 Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
   innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
         +'<series>'
              +'<Pie2DSeries nameField="'+category[0]+'" field="'+category[1]+'" startAngle="270" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
                 +'<fills>'
                       +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                 +'</fills>'
              /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                  +'<showDataEffect>'
                  /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                       +'<SeriesZoom duration="1000"/>'
 /*
 SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
- 공통속성 -
   elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
 minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
              이 값보다 짧은 시간에 effect가 실행되지 않습니다
offset : effect개시의 지연시간을 설정합니다 default:0
   perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
  - SeriesZoom속성 -
   relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
   horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
 verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
   */
                 +'</showDataEffect>'
             +'</Pie2DSeries>'
        +'</series>'
         +'<backgroundElements>'	
              +'<CanvasElement>'
                   +'<CanvasLabel text="'+percentage+'%" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="#333333" backgroundAlpha="0"/>'
                   +'<CanvasLabel text="('+data[0][category[1]]+'/'+data[1][category[1]]+')" height="24" horizontalCenter="0" verticalCenter="10" fontSize="8" color="#666666" backgroundAlpha="0"/>'
                   /*+'<CanvasLabel width="85" height="30" bottom="0" horizontalCenter="" textAlign="center" text="'+variable[0]+'" fontSize="14" color="#ffffff" fontWeight="bold" borderColor="#d9d9d9" borderThickness="2" borderStyle="solid" backgroundColor="#0070c0" backgroundAlpha="1" borderRadius="6"/>'*/
            +'</CanvasElement>'
          +'</backgroundElements>'
     +'</Pie2DChart>'
 +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2,
      });
}
function targetgraph4(targetId, data, category, variable){
   //Annual Report
   let percentage = Number((data[0][category[1]] / data[1][category[1]]*100).toFixed());
   let data2 = JSON.parse(JSON.stringify(data));
   data2[1][category[1]] = data2[1][category[1]] - data2[0][category[1]];
   let layoutStr = '<rMateChart borderStyle="none">'
         +'<Options>'
      +'</Options>'
    +'<Pie2DChart innerRadius="0.8" showDataTips="true"  width="'+variable[1]+'"  selectionMode="single">'
 /*
 Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
   innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
         +'<series>'
              +'<Pie2DSeries nameField="'+category[0]+'" field="'+category[1]+'" startAngle="270" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
                 +'<fills>'
                     +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                 +'</fills>'
              /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                  +'<showDataEffect>'
                  /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                       +'<SeriesZoom duration="1000"/>'
 /*
 SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
- 공통속성 -
   elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
 minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
              이 값보다 짧은 시간에 effect가 실행되지 않습니다
offset : effect개시의 지연시간을 설정합니다 default:0
   perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
  - SeriesZoom속성 -
   relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
   horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
 verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
   */
                 +'</showDataEffect>'
             +'</Pie2DSeries>'
        +'</series>'
         +'<backgroundElements>'	
              +'<CanvasElement>'
                   +'<CanvasLabel text="'+percentage+'%" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="#333333" backgroundAlpha="0"/>'
                   +'<CanvasLabel text="('+data[0][category[1]]+'/'+data[1][category[1]]+')" height="24" horizontalCenter="0" verticalCenter="10" fontSize="8" color="#666666" backgroundAlpha="0"/>'
                   +'<CanvasLabel width="85" height="30" top="0" horizontalCenter="" textAlign="center" text="'+variable[0]+'" fontSize="14" color="#ffffff" fontWeight="bold" borderColor="#d9d9d9" borderThickness="2" borderStyle="solid" backgroundColor="" backgroundAlpha="1" borderRadius="6"/>'
            +'</CanvasElement>'
          +'</backgroundElements>'
     +'</Pie2DChart>'
 +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2,
      });
}
function targetgraph5(targetId, data, category, variable){
   
   
   let layoutStr = '<rMateChart borderStyle="none">'
         +'<Options>'
      +'</Options>'
    +'<Pie3DChart showDataTips="true" innerRadius="0.5" depth="25" >'
 /*
 Doughnut3D 차트 생성시에 필요한 Pie3DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
   innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
         +'<series>'
              +'<Pie3DSeries alwayShowLabels="true" nameField="'+category[0]+'" field="'+category[1]+'" labelPosition="inside" color="#ffffff">'
            /* Pie3DChart 정의 후 Pie3DSeries labelPosition="inside"정의합니다 */
                  +'<showDataEffect>'
                  /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                       +'<SeriesSlide direction="right" duration="1000"/>'
  /*
 SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다
  - 공통속성 -
   elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
 minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
              이 값보다 짧은 시간에 effect가 실행되지 않습니다
offset : effect개시의 지연시간을 설정합니다 default:0
   perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
  - SeriesSlide속성 -
  direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다
 */
                 +'</showDataEffect>'
             +'<fills>'
                     +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                 +'</fills>'
             +'</Pie3DSeries>'
        +'</series>'
        +'<backgroundElements>'	
        +'<CanvasElement>'
        //+'<CanvasLabel width="85" height="30" bottom="0" horizontalCenter="" textAlign="center" text="'+variable[0]+'" fontSize="14" color="#ffffff" fontWeight="bold" borderColor="#d9d9d9" borderThickness="2" borderStyle="solid" backgroundColor="#0070c0" backgroundAlpha="1" borderRadius="6"/>'
+'</CanvasElement>'
    +'</backgroundElements>'
     +'</Pie3DChart>'
 +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data,
      });
}
function targetgraph6(targetId, data, category, variable){
   //Annual Report
   let textbox = $("#" + targetId + "_t1");
   textbox.append("<div style='background-color:"+variable[1]+"' class='ac_ts'>"+variable[0]+"<div>")
   
   let percentage = Number((data[0][category[1]] / data[1][category[1]]*100).toFixed());
   let data2 = JSON.parse(JSON.stringify(data));
   data2[1][category[1]] = data2[1][category[1]] - data2[0][category[1]];
   
   let layoutStr = '<rMateChart borderStyle="none">'
         +'<Options>'
      +'</Options>'
    +'<Pie2DChart innerRadius="0.8" showDataTips="true"  width="'+variable[1]+'"  selectionMode="single" >'
 /*
 Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
   innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
         +'<series>'
              +'<Pie2DSeries paddingBottom="30" nameField="'+category[0]+'" field="'+category[1]+'" startAngle="270" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
                 +'<fills>'
                       +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                 +'</fills>'
              /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                  +'<showDataEffect>'
                  /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                       +'<SeriesZoom duration="1000"/>'
 /*
 SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
- 공통속성 -
   elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
 minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
              이 값보다 짧은 시간에 effect가 실행되지 않습니다
offset : effect개시의 지연시간을 설정합니다 default:0
   perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
  - SeriesZoom속성 -
   relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
   horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
 verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
   */
                 +'</showDataEffect>'
             +'</Pie2DSeries>'
        +'</series>'
         +'<backgroundElements>'	
              +'<CanvasElement>'
                   +'<CanvasLabel text="'+percentage+'%" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="#333333" backgroundAlpha="0"/>'
                   +'<CanvasLabel text="('+data[0][category[1]]+'/'+data[1][category[1]]+')" height="24" horizontalCenter="0" verticalCenter="10" fontSize="8" color="#666666" backgroundAlpha="0"/>'
           +'</CanvasElement>'
          +'</backgroundElements>'
     +'</Pie2DChart>'
 +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2,
      });
}
function targetgraph7(targetId, data, category, variable){
   //Annual Report
   
   let percentage = Number((data[0][category[1]] / data[1][category[1]]*100).toFixed());
   let data2 = JSON.parse(JSON.stringify(data));
   data2[1][category[1]] = data2[1][category[1]] - data2[0][category[1]];
   
   let layoutStr = '<rMateChart borderStyle="none">'
         +'<Options>'
      +'</Options>'
    +'<Pie2DChart innerRadius="0.8" showDataTips="true"  width="'+variable[1]+'"  selectionMode="single" >'
 /*
 Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
   innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
         +'<series>'
              +'<Pie2DSeries paddingBottom="30" nameField="'+category[0]+'" field="'+category[1]+'" startAngle="270" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
                 +'<fills>'
                       +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                     +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                 +'</fills>'
              /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                  +'<showDataEffect>'
                  /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                       +'<SeriesZoom duration="1000"/>'
 /*
 SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
- 공통속성 -
   elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
 minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
              이 값보다 짧은 시간에 effect가 실행되지 않습니다
offset : effect개시의 지연시간을 설정합니다 default:0
   perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
  - SeriesZoom속성 -
   relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
   horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
 verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
   */
                 +'</showDataEffect>'
             +'</Pie2DSeries>'
        +'</series>'
         +'<backgroundElements>'	
              +'<CanvasElement>'
                   +'<CanvasLabel text="'+percentage+'%" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="#333333" backgroundAlpha="0"/>'
                   +'<CanvasLabel text="('+data[0][category[1]]+'/'+data[1][category[1]]+')" height="24" horizontalCenter="0" verticalCenter="10" fontSize="8" color="#666666" backgroundAlpha="0"/>'
           +'</CanvasElement>'
          +'</backgroundElements>'
     +'</Pie2DChart>'
 +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2,
      });
}
function targetgraph8(targetId, data, category, variable){
   let data2 = data;
   let layoutStr =
         '<rMateChart  borderStyle="none">'
           +'<Options>'
         +'</Options>'
         +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
            +'<Area2DChart showDataTips="true">'
       /*
      type 속성을 stacked로 변경    type속성으로는
       clustered : 일반적인 다중데이터(차트의 멀티시리즈)방식으로 데이터를 표현합니다.(Default)
      stacked : 데이터를 위에 쌓아 올린 방식으로 표현 합니다.
        overlaid : 수치 데이터 값을 겹쳐서 표현 합니다. 주로 목표 위치와 현재 위치를 나타낼 때 많이 쓰입니다.
        100% : 차트의 수치 데이터를 퍼센티지로 계산 후 값을 퍼센티지로 나타냅니다.
       */
              +'<horizontalAxis>'
                   +'<CategoryAxis categoryField="'+category[0]+'" padding="0"/>'
               +'</horizontalAxis>'
              +'<verticalAxis>'
                 +'<LinearAxis id="vAxis" formatter="{numfmt}" />'
             +'</verticalAxis>'
                +'<verticalAxisRenderers>'
                    +'<Axis2DRenderer axis="{vAxis}" placement="right" padding="0" />'
                +'</verticalAxisRenderers>'
               +'<series>'
               +'<Area2DSeries yField="'+category[2]+'" displayName="'+category[2]+'">'
               +'<showDataEffect>'
                   +'<SeriesInterpolate duration="1000"/>'
               +'</showDataEffect>'
               +'<areaStroke>'
               +'<Stroke color="'+variable.strokeColor[0]+'" weight="1"/>'
           +'</areaStroke>' 
                 +'<areaFill>'
            +'<LinearGradient>'
               +'<entries>'
               +'<GradientEntry color="'+variable.fillColor[0]+'" ratio="0.5" alpha="1"/>'
               +'</entries>'
            +'</LinearGradient>'
         +'</areaFill>'  
          +'</Area2DSeries>'
               /* Area Stacked 를 생성시에는 Area2DSeries를 최소 2개 정의합니다 */
                    +'<Area2DSeries yField="'+category[1]+'" displayName="'+category[1]+'">'
                        +'<showDataEffect>'
                           +'<SeriesInterpolate duration="1000"/>'
                       +'</showDataEffect>'
                       +'<areaStroke>'
                          +'<Stroke color="'+variable.strokeColor[1]+'" weight="1"/>'
                      +'</areaStroke>' 
                 +'<areaFill>'
                  +'<LinearGradient>'
                     +'<entries>'
                     +'<GradientEntry color="'+variable.fillColor[1]+'" ratio="1" alpha="1"/>'
                     +'</entries>'
                  +'</LinearGradient>'
               +'</areaFill>'
                  +'</Area2DSeries>'
                +'</series>'
              +'<annotationElements>'
               +'</annotationElements>'
          +'</Area2DChart>'
     +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2,
      });
}
function targetgraph9(targetId, data, category, variable){
   let layoutStr =
         '<rMateChart borderStyle="none">'
            +'<Options>'
            +'<Legend defaultMouseOverAction="false" useVisibleCheck="true" hAlign="right" borderWidth="0" position="top" backgroundColor="inherit"/>'
           +'</Options>'
          +'<Column2DChart showDataTips="true" columnWidthRatio=".75" >'
              +'<horizontalAxis>'
                    +'<CategoryAxis categoryField="'+category[0]+'"/>'
               +'</horizontalAxis>'
              
                 +'<series>'
                    +'<Column2DSeries labelPosition="outside" yField="'+category[1]+'" displayName="'+category[1]+'" showValueLabels="[0]">'
                +'<fills>'
                          +'<SolidColor color="'+variable.fillColor[0]+'"/>'
                    +'</fills>'
                         +'<showDataEffect>'
                            +'<SeriesInterpolate/>'
                        +'</showDataEffect>'
                   +'</Column2DSeries>'
                   +'<Column2DSeries labelPosition="outside" yField="'+category[3]+'" displayName="'+category[3]+'" showValueLabels="[0]">'
               +'<fills>'
                          +'<SolidColor color="'+variable.fillColor[1]+'"/>'
                    +'</fills>'
                         +'<showDataEffect>'
                            +'<SeriesInterpolate/>'
                        +'</showDataEffect>'
                   +'</Column2DSeries>'
                   +'<Column2DSeries labelPosition="outside" yField="'+category[2]+'" displayName="'+category[2]+'" showValueLabels="[0]">'
               +'<fills>'
                          +'<SolidColor color="'+variable.fillColor[2]+'"/>'
                    +'</fills>'
                         +'<showDataEffect>'
                            +'<SeriesInterpolate/>'
                        +'</showDataEffect>'
                   +'</Column2DSeries>'
               +'</series>'
           +'</Column2DChart>'
        +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data, 
      });
}

function targetgraph10(targetId, data, category, variable){
   let data2 = JSON.parse(JSON.stringify(data));
   for(let i = 0; i < data.length; i++) {
      if(data2[i][category[2]] != 0){
         data2[i][category[1]] = Number(data[i][category[1]] / data[i][category[2]] * 100).toFixed();
         data2[i][category[2]] = 100 - Number(data[i][category[1]] / data[i][category[2]] * 100).toFixed();
      }else{
         
         data2[i][category[2]] = 100;
      }
      if(data2[i][category[4]] != 0){

         data2[i][category[3]] = Number(data[i][category[3]] / data[i][category[4]] * 100).toFixed();
         data2[i][category[4]] = 100 - Number(data[i][category[3]] / data[i][category[4]] * 100).toFixed();
         
      }else{
         data2[i][category[4]] = 100;
      }
      
   }
   let layoutStr =
      '<rMateChart borderStyle="none" >'
         +'<Options>'
            +'<Legend defaultMouseOverAction="false" hAlign="right" borderWidth="0" backgroundColor="inherit" position="top"/>'
         +'</Options>'
        +'<Column2DChart showDataTips="true" columnWidthRatio=".75">'
               +'<horizontalAxis>'
                  +'<CategoryAxis categoryField="'+category[0]+'"/>'
             +'</horizontalAxis>'
               +'<series>'
                  /* type 속성을 stacked로 변경 */
                 /* type속성으로는*/
                 /* clustered : 일반적인 다중데이터(차트의 멀티시리즈)방식으로 데이터를 표현합니다.(Default)*/
                /* stacked : 데이터를 위에 쌓아 올린 방식으로 표현 합니다.*/
                  /* overlaid : 수치 데이터 값을 겹쳐서 표현 합니다. 주로 목표 위치와 현재 위치를 나타낼 때 많이 쓰입니다.*/
                  /* 100% : 차트의 수치 데이터를 퍼센티지로 계산 후 값을 퍼센티지로 나타냅니다. */
                +'<Column2DSet type="stacked" showTotalLabel="true" totalLabelJsFunction="totalFunc" labelYOffset="-5">'
                     +'<series>'
                      /*  Column2D Stacked 를 생성시에는 Column2DSeries를 최소 2개 정의합니다 */
                        +'<Column2DSeries labelPosition="inside" yField="'+category[1]+'" displayName="'+category[1]+'" showValueLabels="[3]">'
                            +'<showDataEffect>'
                                  +'<SeriesInterpolate/>'
                              +'</showDataEffect>'
                              +'<fill>'
                        +'<SolidColor color="'+variable.fillColor[0]+'" alpha="1"/>'
                  +'</fill>'
                         +'</Column2DSeries>'
                         +'<Column2DSeries labelPosition="inside" yField="'+category[2]+'" displayName="'+category[2]+'" color="#7f7f7f" showValueLabels="[3]">'
                            +'<showDataEffect>'
                                  +'<SeriesInterpolate/>'
                              +'</showDataEffect>'
                              +'<fill>'
                      +'<SolidColor color="'+variable.fillColor[1]+'" alpha="1"/>'
                +'</fill>'
                         +'</Column2DSeries>'
                     +'</series>'
                 +'</Column2DSet>'
                +'<Column2DSet type="stacked" showTotalLabel="true" totalLabelJsFunction="totalFunc" labelYOffset="-5">'
                     +'<series>'
                      /*  Column2D Stacked 를 생성시에는 Column2DSeries를 최소 2개 정의합니다 */
                        +'<Column2DSeries labelPosition="inside" yField="'+category[3]+'" displayName="'+category[3]+'" showValueLabels="[3]">'
                            +'<showDataEffect>'
                                  +'<SeriesInterpolate/>'
                              +'</showDataEffect>'
                              +'<fill>'
                          +'<SolidColor color="'+variable.fillColor[2]+'" alpha="1"/>'
                       +'</fill>'
                         +'</Column2DSeries>'
                         +'<Column2DSeries labelPosition="inside" yField="'+category[4]+'" displayName="'+category[4]+'" showValueLabels="[3]">'
                              +'<showDataEffect>'
                                  +'<SeriesInterpolate/>'
                              +'</showDataEffect>'
                              +'<fill>'
                         +'<SolidColor color="'+variable.fillColor[3]+'" alpha="1"/>'
                      +'</fill>'
                         +'</Column2DSeries>'
                     +'</series>'
                 +'</Column2DSet>'
            +'</series>'
         +'</Column2DChart>'
      +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data2, 
      });
}
function targetgraph11(targetId, data, category, variable){
   let layoutStr =
       '<rMateChart borderStyle="none">'
             +'<Options>'
               +'<Legend hAlign="right" borderWidth="0" backgroundColor="inherit" position="top" defaultMouseOverAction="false" />'
             +'</Options>'
           +'<Column2DChart showDataTips="true" columnWidthRatio="0.85">'
               +'<horizontalAxis>'
                     +'<CategoryAxis categoryField="'+category[0]+'"/>'
                +'</horizontalAxis>'
                
                  +'<series>'
                     /*
                    type 속성을 stacked로 변경
                      type속성으로는
                     clustered : 일반적인 다중데이터(차트의 멀티시리즈)방식으로 데이터를 표현합니다.(Default)
                    stacked : 데이터를 위에 쌓아 올린 방식으로 표현 합니다.
                      overlaid : 수치 데이터 값을 겹쳐서 표현 합니다. 주로 목표 위치와 현재 위치를 나타낼 때 많이 쓰입니다.
                      100% : 차트의 수치 데이터를 퍼센티지로 계산 후 값을 퍼센티지로 나타냅니다.
                     */
                    +'<Column2DSet type="stacked" showTotalLabel="true" totalLabelJsFunction="totalFunc">'
                          +'<series>'
                     /*  Column2D Stacked 를 생성시에는 Column2DSeries를 최소 2개 정의합니다 */
                           +'<Column2DSeries labelPosition="inside" yField="'+category[1]+'" displayName="'+category[1]+'" showValueLabels="[]" color="#ffffff" >'
                                 +'<showDataEffect>'
                                     +'<SeriesInterpolate/>'
                                 +'</showDataEffect>'
                        +'<fill>'
                            +'<SolidColor color="'+variable.fillColor[1]+'" alpha="1"/>'
                         +'</fill>'
                            +'</Column2DSeries>'
                            +'<Column2DSeries labelPosition="inside" yField="'+category[2]+'" displayName="'+category[2]+'" showValueLabels="[]" color="#ffffff" >'
                                 +'<showDataEffect>'
                                     +'<SeriesInterpolate/>'
                                 +'</showDataEffect>'
                        +'<fill>'
                            +'<SolidColor color="'+variable.fillColor[0]+'" alpha="1"/>'
                         +'</fill>'
                            +'</Column2DSeries>'
                        +'</series>'
                    +'</Column2DSet>'
               +'</series>'
            +'</Column2DChart>'
         +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data, 
      });
}
function targetgraph12(targetId, data, category, variable){
   let layoutStr =
      '<rMateChart borderStyle="none">'
         +'<Options>'
         +'<Legend hAlign="right" borderWidth="0" backgroundColor="inherit" position="top" defaultMouseOverAction="false" />'
        +'</Options>'
       +'<Column2DChart showDataTips="true" columnWidthRatio="0.55" selectionMode="single">'
           +'<horizontalAxis>'
                 +'<CategoryAxis categoryField="'+category[0]+'"/>'
            +'</horizontalAxis>'
              +'<series>'
                 +'<Column2DSeries halfWidthOffset="0" labelPosition="outside" yField="'+category[1]+'" displayName="'+category[1]+'" showValueLabels="[2]">'
                      +'<showDataEffect>'
                         +'<SeriesInterpolate/>'
                     +'</showDataEffect>'
               +'<fill>'
                  +'<SolidColor color="'+variable.fillColor[0]+'" alpha="1"/>'
               +'</fill>'
                +'</Column2DSeries>'
                +'<Column2DSeries halfWidthOffset="0" labelPosition="outside" yField="'+category[2]+'" displayName="'+category[2]+'" showValueLabels="[2]">'
                      +'<showDataEffect>'
                         +'<SeriesInterpolate/>'
                     +'</showDataEffect>'
               +'<fill>'
                  +'<SolidColor color="'+variable.fillColor[1]+'" alpha="1"/>'
               +'</fill>'
                +'</Column2DSeries>'
            +'</series>'
        +'</Column2DChart>'
     +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data, 
      });
}
function targetgraph13(targetId, data, category, variable){
   let layoutStr =
       '<rMateChart borderStyle="none">'
         +'<Options>'
            
          +'</Options>'
       +'<Area2DChart showDataTips="true" dataTipDisplayMode="axis">'
      /*
    Area 차트 생성시에 필요한 Area2DChart를 정의합니다
   showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다
   */
            +'<horizontalAxis>'
                 +'<CategoryAxis categoryField="'+category[0]+'" padding="0.5"/>'
              +'</horizontalAxis>'
            +'<verticalAxis>'
               +'<LinearAxis id="vAxis"/>'
             +'</verticalAxis>'
              +'<verticalAxisRenderers>'
                  +'<Axis2DRenderer axis="{vAxis}"/>'
             +'</verticalAxisRenderers>'
             +'<series>'
                 +'<Area2DSeries labelPosition="up" yField="'+category[1]+'" form="curve" showValueLabels="[]" displayName="'+category[1]+'">'
                /* Area2DChart 정의 후 Area2DSeries를 정의합니다. form 속성으로는 curve */
                      +'<showDataEffect>'
                     /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                          +'<SeriesInterpolate/>'
                         /*
                        SeriesInterpolate는 시리즈 데이터가 새로운 시리즈 데이터로 표시될 때 이동하는 효과를 적용합니다
                         - 공통속성 -
                          elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
                        minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
                                     이 값보다 짧은 시간에 effect가 실행되지 않습니다
                       offset : effect개시의 지연시간을 설정합니다 default:0
                          perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
                         */
                    +'</showDataEffect>'
               +'<areaFill>'
                  +'<SolidColor color="'+variable.fillColor[0]+'" alpha="1"/>'
               +'</areaFill>'
               +'<areaStroke>'
                  +'<Stroke color="'+variable.fillColor[1]+'" weight="1"/>'
               +'</areaStroke>'
                +'</Area2DSeries>'
              +'</series>'
        +'</Area2DChart>'
   +'</rMateChart>';
   rMateChartH5.calls(targetId, {
        "setLayout" : layoutStr,
        "setData" : data, 
      });
}
//외부 함수들
function randomdataGenerator2() {
   return [{ "Indicator": "Constraints", "performance": Math.round(Math.random() * 100) }, { "Indicator": "Efficiency", "performance": Math.round(Math.random() * 100) }];
}
function randomdataGenerator3() {
   let li = Math.round(Math.random() * 100);
   if (li <= 50) {
      li = (li + 50);
   } else {

   }
   return [{ "Indicator": "performance", "share": Number((li * Math.random()).toFixed()) }, { "Indicator": "target", "share": li }];
}
function randomdataGenerator_3() {
   let li = Math.round(Math.random() * 100);
   if (li <= 50) {
      li = (li + 50);
   } else {

   }
   return [{ "Indicator": "performance", "share": Number((li * Math.random()).toFixed()) }, { "Indicator": "target", "share": li }, { "Indicator": "ample", "share": Math.round(Math.random() * 100) }];
}
function randomdataGenerator(variable, round, limit) {
   //ver 1.0
   for (let i = 0; i < round; i++) {
      let l = Math.round(Math.random() * limit);
      let j = Math.round(Math.random() * 100);
      if (i < 10) {
         variable.push({ "HH": "0" + i, "performance": Math.round(l * Math.random()), "target": l, "share": Math.round(Math.random() * 100), "share": j, "PER Ratio": j * (1 + Math.round(Math.random())) });
      } else {
         variable.push({ "HH": i, "performance": Math.round(l * Math.random()), "target": l, "share": Math.round(Math.random() * 100), "share": j, "PER Ratio": j * (1 + Math.round(Math.random())) });
      }
   }
}
function pieSeriesLabelFunc(seriesId, index, data, values) {
   return data[Object.keys(data)[0]] + ", <br> " + Number(values[1]).toFixed(1) + "%";
}
function pieDataTip(seriesId, seriesName, index, xName, yName, data, values) {
   return data[Object.keys(data)[0]] + ", " + data[Object.keys(data)[1]] + "<br>" + Number(values[1]).toFixed(1) + "%";
}
function LinearlabelFunc(id, value) {
   return value + "%";
}
function operationException(target) {
   //data 형태는 data = []
   target.addClass("d-flex");
   target.append('<div class="width_grade1 operationException1"><div class="operationException1_item">지 연</div></div>');
   target.append('<div class="width_grade1 flexcolumn operationException2"><div class="d-flex-center operationException_item operationException_target grade_2"></div><div class=" d-flex-center operationException_target operationException_item grade_2"></div></div>');
   target.append('<div class="width_grade1 flexcolumn operationException2"><div class="grade_2 d-flex-center operationException_item"><div class="operationException1_item">결 항</div></div>\
      <div class="grade_2  d-flex-center operationException_item"><div class=" operationException1_item">회 항</div></div></div>');
   target.append('<div class="width_grade1 flexcolumn operationException2"><div class="d-flex-center operationException_target operationException_item grade_2"></div><div class=" d-flex-center operationException_target operationException_item grade_2"></div></div>');
}
function operationException_data(data) {
   $($(".operationException_target")[0]).html(data[0] + '건(' + Number(data[0] / data[1] * 100).toFixed() + '%)<br>(주기장 기준)');
   $($(".operationException_target")[1]).html(data[2] + '건(' + Number(data[2] / data[3] * 100).toFixed() + '%)<br>(이착륙 기준)');
   $($(".operationException_target")[2]).html(data[4] + '건<br>(' + Number(data[4] / data[5] * 100).toFixed() + '%)');
   $($(".operationException_target")[3]).html(+data[6] + '건<br>(' + Number(data[6] / data[7] * 100).toFixed() + '%)');
}
function ac_efficiency(target) {
   target.css({ "display": "grid", "grid-template-columns": "2fr 1fr 1fr 1fr" });
   target.append('<div id="ac_efficiency_c1" class="ac_efficiency_target"></div><div class="ac_efficiency_target flexcolumn"><div  class="grade_2"><div id="ac_efficiency_c2" class="grade_3"></div><div id="ac_efficiency_e2_t1" class="grade_1 ac_t1"></div></div><div class="grade_2"><div id="ac_efficiency_c3" class="grade_3"></div><div id="ac_efficiency_e3_t1" class="grade_1 ac_t1"></div></div></div>\
      <div class="ac_efficiency_target flexcolumn"><div class="grade_2"><div id="ac_efficiency_c4" class="grade_3"></div><div id="ac_efficiency_e4_t1" class="grade_1 ac_t1"></div></div><div class="grade_2"><div id="ac_efficiency_c5" class="grade_3"></div><div id="ac_efficiency_e5_t1" class="grade_1 ac_t1"></div></div></div><div class="ac_efficiency_target flexcolumn"><div  class="grade_2"><div id="ac_efficiency_c6" class="grade_3"></div><div id="ac_efficiency_e6_t1" class="grade_1 ac_t1"></div></div><div class="grade_2"><div id="ac_efficiency_c7" class="grade_3"></div><div id="ac_efficiency_e7_t1" class="grade_1 ac_t1"></div></div></div>');
}
function graphcreate(rmateid, targetid, howmany, start) {
   for (let i = start; i < (howmany + start); i++) {
      rMateChartH5.create(rmateid + i, targetid + i, "", "100%", "100%");
   }
}
function graphcreate_only(targetid) {
   rMateChartH5.create(targetid + '_g' + 1, targetid, "", "100%", "100%");
}
function sampledatacreator() {

}
function weather_container(target) {
   target.css({ "display": "grid", "grid-template-columns": "2fr 1fr 1fr" });
   target.append('<div id="weather_c1" ><div id="weather_c1_c1"><div id="weather_c1_c1_c1">이미지</div><div id="weather_c1_c1_c2">4.6℃</div><div id="weather_c1_c1_c3">구름많음</div></div></div>\
      <div id="weather_c2"><ul><li>풍향: 서 </li><li>시정: 9000m </li><li>일강수: -mm </li><li>적설: -cm </li></ul></div><div id="weather_c3"><ul><li>풍속: 11kt</li><li>운고: 4,700 ft</li></ul></div>');
}
function grid_divide(target, grid_column, grid_row) {
   target.css({ "display": "grid", "grid-template-columns": grid_column, "grid-template-rows": grid_row });
}
function table_creator(target, tablecss, tableid, column, row) {

   target.append("<table id='" + tableid + "'></table>");
   let target2 = $("#" + tableid);

   target2.css(tablecss);
   target2.append("<thead><tr></tr></thead><tbody></tbody>");
   let target3 = $("#" + tableid + " tr");
   for (let i = 0; i < column; i++) {
      target3.append("<th></th>");
   }
   let target4 = $("#" + tableid + " tbody");
   for (let i = 0; i < row; i++) {
      target4.append("<tr></tr>");
      let target5 = $("#" + tableid + " tbody tr");

      for (let l = 0; l < column; l++) {
         $(target5[i]).append("<td></td>");
      }
   }

}
function table_creator2(target, tablecss, tableid, column, row) {
   target.append("<table id='" + tableid + "'></table>");
   let target2 = $("#" + tableid);
   target2.css(tablecss);
   for (let i = 0; i < row; i++) {
      target2.append("<tr></tr>");
      let target3 = $("#" + tableid + " tr");
      for (let l = 0; l < column; l++) {
         $(target3[i]).append("<td></td>");
      }
   }
}
//data는 data.length가 row, data[0].length가 column 이 된다
//tableid 는 DOM형태가 아닌 이름만 들어오면 됨
function table_fill(tableid, data) {
   let tableth = $("#" + tableid + " th");
   let tabletd = $("#" + tableid + " td");
   let j = 0;
   for (let i = 0; i < Object.keys(data[0]).length; i++) {

      $(tableth[i]).html(data[0][Object.keys(data[0])[i]]);
   }
   for (let i = 0; i < data.length - 1; i++) {
      for (let l = 0; l < Object.keys(data[0]).length; l++) {

         $(tabletd[j]).html(data[i + 1][Object.keys(data[0])[l]]);
         j++;
      }
   }
}
function tagname(target, targetcss, targetcss2, content, targetclassname) {
   target.css(targetcss);
   target.append('<div class="' + targetclassname + '">' + content + '</div>');
   $($("." + targetclassname)[0]).css(targetcss2);
}
function container_maker(target, targetcss, howmany, targetname) {
   target.css(targetcss);
   for (let i = 1; i < howmany + 1; i++) {
      target.append('<div id="' + targetname + '_c' + i + '" class="' + targetname + '_c ' + targetname + '_c' + i + '">');
   }
}
function grid_area(targetname, howmany, gridname) {
   for (let i = 1; i < howmany + 1; i++) {
      $(targetname + i).css({ 'grid-area': gridname + i });
   }
}
function scheduletable(target, targetname) {

   $(target).append('<table class="' + targetname + '" id="' + targetname + '" ><thead><tr><th rowspan="2">시간</th><th colspan="3">계획</th><th colspan="3">실적</th></tr><tr><th>도착</th><th>출발(여행기)</th><th>도착</th><th>도착</th><th>도착</th><th>도착</th></tr></thead><tbody><tr><td>18</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>19</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>20</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>21</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>22</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>');


}
function twodonut2(targetid, variable) {
   let target = $("#" + targetid);
   target.css({ "display": "flex" });
   target.append("<div class='twodonut2_c'><div class='twodonut2_c_t'>" + variable[0] + "</div><div class='twodonut2_c_c'><div id='" + targetid + "_c1'></div><div id='" + targetid + "_c2'></div><div class='twodonut_c_c_t'>" + variable[2] + "</div><div class='twodonut_c_c_t'>" + variable[3] + "</div></div>\
</div><div class='twodonut2_c'><div class='twodonut2_c_t'>"+ variable[1] + "</div><div class='twodonut2_c_c'><div id='" + targetid + "_c3'></div><div id='" + targetid + "_c4'></div><div class='twodonut_c_c_t'>" + variable[4] + "</div><div class='twodonut_c_c_t'>" + variable[5] + "</div></div></div>");

}
//기본 생성자
//variable 형태는 object 안에 array형태 
/* {'graphColor': ['red', 'blue', '#ffffff'],
   color : ['white', 'black'],
   variable : [200, 'white', '500'],
   indicator : ['good', 'normal', 'bad', 'error'],
   fontSize : [36]}
*/
function defaultvariable(variable) {
   //color  //폰트 컬러
   if (!('color' in variable)) {
      variable.color = [];
   }
   for (let i = 0; i < 4; i++) {
      if (variable['color'][i] === undefined) {
         variable['color'].push('#' + Math.round(Math.random() * 0xFFFFFF).toString(16));
      }
   }
   //fillColor   // pie같은 공간을 차지하는 그래프컬러
   if (!('fillColor' in variable)) {
      variable.fillColor = [];
   }
   for (let i = 0; i < 4; i++) {
      if (variable.fillColor[i] === undefined) {
         variable.fillColor.push('#' + Math.round(Math.random() * 0xFFFFFF).toString(16));
      }
   }
   //strokeColor  // line같은 선형 컬러
   if (!('strokeColor' in variable)) {
      variable.strokeColor = [];
   }
   for (let i = 0; i < 4; i++) {
      if (variable.strokeColor[i] === undefined) {
         variable.strokeColor.push('#' + Math.round(Math.random() * 0xFFFFFF).toString(16));
      }
   }
   //title 고정형
   if (!('title' in variable)) {
      variable.title = [];
      variable.title[0] = 'title'
      variable.title[1] = 'title2'
   }
   //subtitle 고정형
   if (!('subtitle' in variable)) {
      variable.subtitle = [];
      variable.subtitle[0] = 'subtitle'
      variable.subtitle[1] = 'subtitle2'
   }
   //text (고정형)
   if (!('text' in variable)) {
      variable.text = [];
      variable.text[0] = 'GOOD';
      variable.text[1] = 'BAD';
   }
   return variable;
}
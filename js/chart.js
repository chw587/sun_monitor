function setGaugeValue(card, percentage) {
    const Dot = card.querySelector('.gauge_dot');
    const needle = card.querySelector('.needle');

    // 점 회전
    const dotAngle = (percentage / 100) * 180;
    Dot.style.transform = `rotate(${dotAngle}deg)`;
    
    // 화살표 이미지 회전
    const needleAngle = -90 + (percentage / 100) * 180;
    needle.style.transform = `translateX(-50%) rotate(${needleAngle}deg)`;

    card.dataset.percentage = percentage;
}

const num_1 = document.querySelector('.card.num_1');
const num_2 = document.querySelector('.card.num_2');
const num_3 = document.querySelector('.card.num_3');
const num_4 = document.querySelector('.card.num_4');
const num_5 = document.querySelector('.card.num_5');

setGaugeValue(num_1, 11);
setGaugeValue(num_2, 45);
setGaugeValue(num_3, 12);
setGaugeValue(num_4, 60);
setGaugeValue(num_5, 50);

// CSS 변수에서 색상 가져오기
function getCSSColor(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// 툴팁 호버 기능 추가
function addTooltip(card, bgColor) {
    const gaugeDot = card.querySelector('.gauge_dot');
    const graph = card.querySelector('.graph');

    gaugeDot.style.cursor = 'pointer';

    gaugeDot.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';

        const currentPercentage = card.dataset.percentage || 0;
        tooltip.textContent = currentPercentage + '%';

        tooltip.style.cssText = `
            position: absolute;
            background: ${bgColor};
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;

        graph.appendChild(tooltip);

        const rect = gaugeDot.getBoundingClientRect();
        const graphRect = graph.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        tooltip.style.left =
            (rect.left - graphRect.left + rect.width / 2 - tooltipRect.width / 2) + 'px';
        tooltip.style.top =
            (rect.top - graphRect.top - tooltipRect.height - 10) + 'px';

        gaugeDot._tooltip = tooltip;
    });

    gaugeDot.addEventListener('mouseleave', function() {
        if (gaugeDot._tooltip) {
            gaugeDot._tooltip.remove();
            gaugeDot._tooltip = null;
        }
    });
}

addTooltip(num_1, getCSSColor('--type1'));
addTooltip(num_2, getCSSColor('--type2'));
addTooltip(num_3, getCSSColor('--type3'));
addTooltip(num_4, getCSSColor('--type4'));
addTooltip(num_5, getCSSColor('--type5'));


// 모바일 차트
// // 데이터를 동적으로 업데이트하는 함수
//         function updateProgressBars(data) {
//             const items = document.querySelectorAll('.progress-item');
            
//             data.forEach((value, index) => {
//                 if (items[index]) {
//                     const fill = items[index].querySelector('.progress-bar-fill');
//                     const valueText = items[index].querySelector('.progress-value');
                    
//                     fill.style.width = value + '%';
//                     valueText.textContent = value;
//                 }
//             });
//         }

//         // 사용 예시
//         // updateProgressBars([45, 70, 30, 85, 60]);
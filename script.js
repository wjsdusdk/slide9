initSlider();

function initSlider() {
    const sliderContainer = document.getElementById("slider");
    const paginationContainer = document.createElement("div");

    // 1. .pagination 생성

    paginationContainer.className = "pagination";
    sliderContainer.prepend(paginationContainer);

    // 2. 슬라이드 개수 파악

    const slideCount = document.querySelectorAll(".slide").length;
    console.log(slideCount);

    for (let i = slideCount; i > 0; i--) {
        // <input type="radio" name="slide-radios" class="slide-radio" id="slide-radio-1" checked></input>
        let radioBtn = document.createElement("input");
        radioBtn.type = "radio";
        radioBtn.name = "slide-radios";
        radioBtn.className = "slide-radio";
        radioBtn.id = `slide-radio-${i}`;
        if (i == 1) radioBtn.checked = true;

        // 3. input 생성

        sliderContainer.prepend(radioBtn);

        // 4. label 생성

        let label = document.createElement("label");
        // <label for="slide-radio-1">1</label>
        label.setAttribute("for", `slide-radio-${i}`);
        // label.innerHTML = i; // 페이징 숫자 (css에서 다른 모양으로 처리했기 때문에 지움)
        paginationContainer.prepend(label);
    }

    // 5. 자동 슬라이드

    let autoRun = setInterval(changeSlide, 2000);

    function changeSlide() {
        // const radioButtons = document.querySelectorAll('.slide-radio');
        // console.log(radioButtons); // NodeList(4)라고 뜸 -> 유사배열을 의미

        // 유사배열을 제대로 된 배열로 바꾸는 법
        const radioButtons = [...document.querySelectorAll(".slide-radio")];
        // console.log(radioButtons);

        const currentIndex = radioButtons.findIndex((rb) => rb.checked);
        // console.log(currentIndex);
        radioButtons[(currentIndex + 1) % radioButtons.length].checked = true;
    }

    // 6. 마우스가 페이징에 들어오면 자동 슬라이드 멈춤

    // function() {a}     ->     () => a
    paginationContainer.addEventListener("mouseenter", () => clearInterval(autoRun));

    // 7. 마우스가 페이징에서 나가면 자동 슬라이드 시작

    paginationContainer.addEventListener("mouseleave", () => (autoRun = setInterval(changeSlide, 2000)));
}

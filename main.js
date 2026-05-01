const v = document.getElementById('mainV');
const playButton = document.getElementById('playButton');
const homeLogo = document.getElementById('homeLogo');
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const themeLabel = document.getElementById('theme-label');
const themeChar = document.getElementById('theme-char');

// 테마 관리
const currentTheme = localStorage.getItem('theme');

function updateThemeUI(theme) {
    if (theme === 'dark') {
        if (themeLabel) themeLabel.textContent = "밤이";
        // 밤이 캐릭터 컨셉: 💪👸 (수건 남자는 없어서 강인함과 여왕으로 대체 표현)
        if (themeChar) themeChar.innerHTML = "💪"; 
    } else {
        if (themeLabel) themeLabel.textContent = "낮져";
        // 낮져 캐릭터 컨셉: 🙇‍♂️👠 (엎드린 남자와 하이힐로 대체 표현)
        if (themeChar) themeChar.innerHTML = "🙇‍♂️";
    }
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
    updateThemeUI(currentTheme);
} else {
    updateThemeUI('light');
}

function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeUI(theme);
}

toggleSwitch.addEventListener('change', switchTheme, false);

function changeSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    // 쇼핑몰 진입 시 바디 배경 처리 (테마에 따라 변수 활용 가능하도록 수정 고려)
    if (id === 'shop') {
        document.body.style.background = 'var(--bg-color)';
    } else {
        document.body.style.background = '#000';
    }
}

function startPlay() {
    changeSection('video-layer');
    v.currentTime = 0;
    v.play().catch(e => console.log("자동재생 오류:", e));
    v.onended = showShop;
    // 영상 로드 실패 등을 대비해 5초 후 강제 전환 안전장치
    setTimeout(() => { 
        if (!v.ended && document.getElementById('video-layer').classList.contains('active')) {
            showShop(); 
        }
    }, 5000);
}

function showShop() {
    changeSection('shop');
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('mainGrid');
    if (grid.innerHTML !== '') return;
    
    const dummyImg = "https://cafe24img.poxo.com/meetkmi0/web/product/medium/202603/f592c40a2b4ac6a5a5831c69427baee8.gif";
    const productNames = [
        "에어라이트 스트레이트 밴딩 팬츠",
        "프리미엄 코튼 릴렉스드 슬랙스",
        "어반 테크니컬 카고 조거",
        "데일리 에센셜 치노 팬츠",
        "윈터 써멀 플리스 라인드 팬츠"
    ];

    let html = '';
    for(let i = 1; i <= 30; i++) {
        const name = productNames[i % productNames.length];
        const price = 39000 + (i * 1000);
        // staggered animation delay calculation
        const delay = (i - 1) * 0.05; 
        
        html += `
        <div class="item reveal" style="animation-delay: ${delay}s">
            <div class="img-box"><img src="${dummyImg}" loading="lazy"></div>
            <div class="info">
                <div class="brand">ONLYPANTS</div>
                <div class="name">${name} Vol.${i}</div>
                <div class="price-area">
                    <span class="sale">10%</span>
                    <span class="price">₩${price.toLocaleString()}</span>
                </div>
            </div>
        </div>`;
    }
    grid.innerHTML = html;
}

// 이벤트 리스너 추가
playButton.addEventListener('click', startPlay);
homeLogo.addEventListener('click', () => {
    location.reload();
});
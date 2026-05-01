const v = document.getElementById('mainV');
const playButton = document.getElementById('playButton');
const homeLogo = document.getElementById('homeLogo');

function changeSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.body.style.background = (id === 'shop') ? '#fff' : '#000';
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
    // 임시 이미지는 외부 링크이므로 그대로 유지
    const dummyImg = "https://cafe24img.poxo.com/meetkmi0/web/product/medium/202603/f592c40a2b4ac6a5a5831c69427baee8.gif";
    let html = '';
    for(let i = 1; i <= 30; i++) {
        html += `
        <div class="item">
            <div class="img-box"><img src="${dummyImg}"></div>
            <div class="info">
                <div class="brand">ONLYPANTS</div>
                <div class="name">에어라이트 스트레이트 밴딩 팬츠 Vol.${i}</div>
                <div class="price-area">
                    <span class="sale">10%</span>
                    <span class="price">₩39,000</span>
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
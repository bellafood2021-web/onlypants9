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
    
    const productImages = [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584315260170-6593f49f6974?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1551854838-212c20b52504?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1506629082925-fe69850937a4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1582552938382-79357599059b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1516762689617-e1cff93988f5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=600&q=80"
    ];

    const productNames = [
        "시그니처 로우 데님 팬츠",
        "프리미엄 테이퍼드 치노",
        "하이웨이스트 와이드 슬랙스",
        "어반 빈티지 스트레이트 진",
        "클래식 드레스 트라우저",
        "테크니컬 카고 조거",
        "린넨 블렌드 릴렉스 팬츠",
        "모던 슬림핏 코튼 팬츠",
        "스트릿 나일론 트랙 팬츠",
        "워크웨어 카펜터 팬츠"
    ];

    let html = '';
    for(let i = 1; i <= 30; i++) {
        const imgIndex = (i - 1) % productImages.length;
        const nameIndex = (i - 1) % productNames.length;
        const img = productImages[imgIndex];
        const name = productNames[nameIndex];
        const price = 45000 + (Math.floor(Math.random() * 20) * 1000);
        const delay = (i - 1) * 0.05; 
        
        html += `
        <div class="item reveal" style="animation-delay: ${delay}s">
            <div class="img-box"><img src="${img}" loading="lazy"></div>
            <div class="info">
                <div class="brand">ONLYPANTS</div>
                <div class="name">${name} Vol.${i}</div>
                <div class="price-area">
                    <span class="sale">NEW</span>
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
// 제휴 문의 폼 처리
const inquiryForm = document.getElementById('inquiry-form');
const formStatus = document.getElementById('form-status');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const submitBtn = inquiryForm.querySelector('.submit-btn');
        
        submitBtn.disabled = true;
        submitBtn.textContent = '보내는 중...';
        formStatus.textContent = '';

        try {
            const response = await fetch(e.target.action, {
                method: inquiryForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.style.color = 'var(--blue)';
                formStatus.textContent = '문의가 성공적으로 전달되었습니다. 감사합니다!';
                inquiryForm.reset();
                submitBtn.textContent = '문의 완료';
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    formStatus.style.color = '#ff4b2b';
                    formStatus.textContent = result.errors.map(error => error.message).join(", ");
                } else {
                    throw new Error();
                }
                submitBtn.disabled = false;
                submitBtn.textContent = '다시 시도';
            }
        } catch (error) {
            formStatus.style.color = '#ff4b2b';
            formStatus.textContent = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            submitBtn.disabled = false;
            submitBtn.textContent = '다시 시도';
        }
    });
}

// 부드러운 스크롤 (Anchor Link)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

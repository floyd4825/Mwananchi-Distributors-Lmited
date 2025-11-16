// Friday Offer Banner
(function () {
    function getParams() {
        return new URLSearchParams(window.location.search);
    }

    function isFridayOrForced(params) {
        if (params.has('offer')) return true;
        var today = new Date();
        return today.getDay() === 5; // 5 = Friday
    }

    function getMidnightCountdownText() {
        var now = new Date();
        var end = new Date(now);
        end.setHours(23, 59, 59, 999);
        var diff = Math.max(0, end - now);
        var hrs = Math.floor(diff / (1000 * 60 * 60));
        var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((diff % (1000 * 60)) / 1000);
        return (hrs + 'h ' + mins + 'm ' + secs + 's');
    }

    function createBanner() {
        var params = getParams();

        var banner = document.createElement('div');
        banner.className = 'offer-banner';

        var inner = document.createElement('div');
        inner.className = 'offer-content';

        var text = document.createElement('div');
        text.className = 'offer-text';
        text.textContent = params.get('offerText') || 'Friday Mega Deal: 10% OFF water tanks today only!';

        var actions = document.createElement('div');
        actions.className = 'offer-meta';

        var codeParam = params.get('offerCode') || 'FRIDAY10';
        if (codeParam) {
            var code = document.createElement('span');
            code.className = 'offer-code';
            code.textContent = 'Code: ' + codeParam;
            actions.appendChild(code);
        }

        var countdown = document.createElement('span');
        countdown.className = 'offer-countdown';
        countdown.textContent = 'Ends in ' + getMidnightCountdownText();
        actions.appendChild(countdown);

        var cta = document.createElement('a');
        cta.href = params.get('offerLink') || 'buy.html';
        cta.className = 'offer-cta';
        cta.textContent = params.get('offerCta') || 'Shop Offer';

        var close = document.createElement('button');
        close.className = 'offer-close';
        close.setAttribute('aria-label', 'Close offer banner');
        close.textContent = '×';
        close.addEventListener('click', function () {
            banner.parentNode && banner.parentNode.removeChild(banner);
        });

        inner.appendChild(text);
        inner.appendChild(actions);
        inner.appendChild(cta);
        inner.appendChild(close);
        banner.appendChild(inner);

        var nav = document.querySelector('.navbar');
        if (nav && nav.parentNode) {
            nav.parentNode.insertBefore(banner, nav.nextSibling);
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }

        // Live update countdown every second
        setInterval(function () {
            countdown.textContent = 'Ends in ' + getMidnightCountdownText();
        }, 1000);
    }

    var params = getParams();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            if (isFridayOrForced(params)) createBanner();
        });
    } else {
        if (isFridayOrForced(params)) createBanner();
    }
})();



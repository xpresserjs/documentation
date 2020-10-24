const hasDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const storeKey = 'xpresserDocsTheme';
const localStorage = window.localStorage;
if (localStorage) {
    const cacheTheme = localStorage.getItem(storeKey);
    if (cacheTheme) {
        const root = document.getElementsByTagName('html')[0];
        if (cacheTheme === 'dark') {
            root.setAttribute('class', 'use-dark-theme');
        } else {
            root.removeAttribute('class');
        }
    } else if (hasDarkModeEnabled) {
        window.onload = function () {
            setTimeout(function () {
                const shouldSwitch = confirm("You have dark mode enabled on your device, would you love us to switch to dark theme too?")
                if (shouldSwitch) {
                    localStorage.setItem(storeKey, 'dark');
                    window.location.reload()
                }
            }, 2000)
        }
    }
}
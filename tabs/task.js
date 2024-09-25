const tabs = document.querySelectorAll('.tab')
const tabsContent = document.querySelectorAll('.tab__content')
const tabsContentArray = [...tabsContent]

let selectedTab = tabs[0];
let selectedTabContent = tabsContent[0];

tabs.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {

        if (selectedTab === tab) return; // доп.проверка

        let clickTab = e.target.closest('.tab');
        if (!clickTab) return;
        if (!tab.contains(clickTab)) return;
        if (selectedTab) {
            selectedTab.classList.remove('tab_active');
            selectedTabContent.classList.remove('tab__content_active');
        }
        selectedTab = clickTab;
        selectedTab.classList.add('tab_active');
        selectedTabContent = tabsContent[i];
        selectedTabContent.classList.add('tab__content_active')
    });
})

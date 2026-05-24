// ==UserScript==
// @name         day.yaml - threshold 地区过滤
// @description  节点数量小于 threshold 时不显示该地区分组
// ==/UserScript==

function main(config, args) {
    const threshold = parseInt(args.threshold) || 1;   // 默认 0（全部显示）

    // 1. 统计每个地区的实际节点数量
    const countryCount = {};
    const countryProxies = {};

    config.proxies.forEach(proxy => {
        const country = getCountry(proxy.name);
        if (!country) return;

        countryCount[country] = (countryCount[country] || 0) + 1;
        if (!countryProxies[country]) countryProxies[country] = [];
        countryProxies[country].push(proxy.name);
    });

    // 2. 生成符合 threshold 的分组
    const newCountryGroups = [];

    Object.keys(countryCount).forEach(country => {
        if (countryCount[country] < threshold) return;   // 关键过滤

        newCountryGroups.push({
            name: `${country}智选`,
            type: "url-test",
            proxies: countryProxies[country],
            url: "http://www.v2ex.com/generate_204",
            interval: 600,
            tolerance: 50,
            lazy: true,
            icon: getIcon(country)
        });
    });

    // 3. 处理 “其他地区智选”
    const otherProxies = config.proxies
        .filter(p => getCountry(p.name) === "其他地区")
        .map(p => p.name);

    if (otherProxies.length >= threshold) {
        newCountryGroups.push({
            name: "其他地区智选",
            type: "url-test",
            proxies: otherProxies,
            url: "http://www.v2ex.com/generate_204",
            interval: 600,
            tolerance: 50,
            lazy: true,
            icon: "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/UN.png"
        });
    }

    // 4. 替换原有国家智选分组
    let groups = config['proxy-groups'] || [];
    groups = groups.filter(g => !g.name.endsWith('智选') || g.name === '所有智选');

    // 添加新生成的分组
    groups.push(...newCountryGroups);

    // 更新 “所有智选” 分组
    const allGroup = groups.find(g => g.name === '所有智选');
    if (allGroup) {
        allGroup.proxies = newCountryGroups.map(g => g.name);
    }

    config['proxy-groups'] = groups;
    return config;
}

// ====================== 辅助函数 ======================
function getCountry(name) {
    const map = {
        "香港": /🇭🇰|香港|HK|Hong/i,
        "台湾": /🇹🇼|台湾|TW|Tai|Taipei/i,
        "日本": /🇯🇵|日本|JP|Tokyo|Japan/i,
        "新加坡": /🇸🇬|新加坡|SG|Singapore/i,
        "美国": /🇺🇸|美国|US|United States|Los Angeles|San Francisco|LA|SF/i,
        "英国": /🇬🇧|英国|UK|London|Britain/i,
        "韩国": /🇰🇷|韩国|KR|Korea/i,
        "法国": /🇫🇷|法国|FR|France|Paris/i,
        "俄罗斯": /🇷🇺|俄罗斯|RU|Russia|Moscow/i,
    };

    for (const [country, regex] of Object.entries(map)) {
        if (regex.test(name)) return country;
    }
    return "其他地区";
}

function getIcon(country) {
    const icons = {
        "香港": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png",
        "台湾": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png",
        "日本": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png",
        "新加坡": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png",
        "美国": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png",
        "英国": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png",
        "韩国": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Korea.png",
        "法国": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/France.png",
        "俄罗斯": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Russia.png",
    };
    return icons[country] || "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/UN.png";
}

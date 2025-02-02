// 参考 Verge Rev 示例 Script 配置
//
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
//
// 最后更新时间: 2024-10-26 23:00

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://captive.apple.com",
  "max-failed-times": 3,
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
    "nameserver": ["223.5.5.5", "119.29.29.29"]
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "手动选择",
      "type": "select",
      "include-all": true,
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "外网选择",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png"
    },
    {
      ...groupBaseOption,
      "name": "YouTube",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "推特消息",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "哔哩哔哩",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/bilibili_3.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务&GitHub",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "IP归属地伪装",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://img.icons8.com/?size=144&id=9A9UJY1V3Zw9&format=png&color=000000"
    },
    {
      ...groupBaseOption,
      "name": "Chat-GPT",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },
    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["自动选择", "手动选择", "香港节点", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://img.icons8.com/?size=144&id=9Mz1BhM4ui54&format=png&color=000000"
    },
    // 地区分组
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "新加坡节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "英国节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "英|🇬🇧|(?i)uk|(?i)Britain|(?i)eng|伦敦",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png"
    },
    {
      ...groupBaseOption,
      "name": "俄罗斯节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "俄|Russia Federation|Russia|RU|russia federation|russia|ru|🇷🇺",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Russia.png"
    },
    {
      ...groupBaseOption,
      "name": "韩国节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "韩|Korea|KR|korea|kr|🇰🇷",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Korea.png"
    },
    {
      ...groupBaseOption,
      "name": "法国节点",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "filter": "法|France|FR|france|fr|🇫🇷",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/France.png"
    },
    {
      ...groupBaseOption,
      "name": "其他地区",
      "type": "url-test",
      "tolerance": 10,
      "include-all": true,
      "exclude-filter": "🇭🇰|🇯🇵|🇺🇸|🇸🇬|🇨🇳|🇫🇷|🇰🇷|🇷🇺|🇬🇧|中国|国内|CN|China|香港|hk|fr|hongkong|台|台湾|TW|taiwan|日本|东京|jp|Tokyo|japan|新加坡|sg|Singapore|美国|US|韩|kr|South Korea|俄|莫斯科|美|英|法|UK|RU|GB",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/UN.png"
    },
    {
      ...groupBaseOption,
      "name": "自动选择",
      "type": "url-test",
      "tolerance": 10,
      "proxies": ["手动选择", "美国节点", "新加坡节点", "日本节点", "台湾节点", "英国节点", "俄罗斯节点", "韩国节点", "法国节点", "其他地区"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Auto.png"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "exclude-filter": "港|🇭🇰|(?i)HK|(?i)Hong",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "exclude-filter": "港|🇭🇰|(?i)HK|(?i)Hong",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "exclude-filter": "港|🇭🇰|(?i)HK|(?i)Hong",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    }
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "IPfake": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/SunsetMkt/anti-ip-attribution/refs/heads/main/generated/surge.list",
      "path": "./rules/IPfake.list"
    },
    "BiliBili": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBili/BiliBili.list",
      "path": "./rules/BiliBili.list"
    },
    "China": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/ChinaMax/ChinaMax.list",
      "path": "./rules/China.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./rules/YouTube.list"
    },
	"TikTok": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://whatshub.top/rule/TikTok.list",
      "path": "./rules/TikTok.list"
	},
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
      "path": "./rules/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://whatshub.top/rule/Twitter.list",
      "path": "./rules/Twitter.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://whatshub.top/rule/OpenAI.list",
      "path": "./rules/AI.list"
    },
    "Global": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Global/Global.list",
      "path": "./rules/Global.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://whatshub.top/rule/Microsoft.list",
      "path": "./rules/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rules/Lan.list"
    },
    "ProxyGFW": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
      "path": "./rules/ProxyGFW.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "PROCESS-NAME,dnplayer.exe,外网选择",
    "DOMAIN-SUFFIX,mypikpak.com,漏网之鱼",
    "DOMAIN-SUFFIX,access.pikpakdrive.com,漏网之鱼",
    "DOMAIN-SUFFIX,bigo.tv,DIRECT",
    "DOMAIN-SUFFIX,cubetecn.com,DIRECT",
    "PROCESS-NAME,parfait_crash_handler.exe,外网选择",
    "PROCESS-NAME,CapCut.exe,外网选择",
    "RULE-SET,IPfake,IP归属地伪装",
    "RULE-SET,AI,Chat-GPT",
    "RULE-SET,BiliBili,哔哩哔哩",
    "RULE-SET,YouTube,YouTube",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,Twitter,推特消息",
    "RULE-SET,TikTok,TikTok",
    "GEOSITE,microsoft,微软服务&GitHub",
    "GEOSITE,gfw,外网选择",
    "RULE-SET,Global,外网选择",
    "GEOIP,lan,DIRECT",
    //"GEOIP,CN,DIRECT",
    "RULE-SET,China,DIRECT",
    "MATCH,漏网之鱼"
  ];

  // 返回修改后的配置
  return config;
}

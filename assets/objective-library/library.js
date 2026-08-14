(function () {
  "use strict";

  const page = document.body.dataset.libraryPage || "library";
  const links = [
    ["index.html", "Overview", "overview"],
    ["guide.html", "Standards", "guide"],
    ["style.html", "Style", "style"],
    ["elements.html", "Elements", "elements"],
    ["components.html", "Components", "components"],
    ["pages.html", "Pages & patterns", "pages"],
  ];

  const localeNames = {
    en: "English",
    "zh-SG": "简体中文",
    "zh-HK": "繁體中文",
    ja: "日本語",
    ko: "한국어",
  };
  const displayModes = ["auto", "light", "dark"];
  const homeCopy = {
    en: {
      lang: "en",
      controls: { language: "Language", displayMode: "Display mode", automatic: "Automatic", light: "Light", dark: "Dark" },
      navGuide: "Standards", navStyle: "Style", navElements: "Elements", navComponents: "Components", navPages: "Pages",
      titleLead: "Design your system", titleTail: "as one system.",
      description: "A governed visual library for calm, precise interfaces across the shared web product. Start with intent, reuse proven modules, and keep every state truthful.",
      start: "Start",
      footerIcons: "Icons by IconPark", licenseOverview: "License overview", localLicense: "Local license",
      librarySections: "Library sections", startExploring: "Start exploring the UI library",
      footerNavigation: "Footer navigation",
      legalTitle: "Open-source licenses", legalIntro: "OneMind UI Design is released under the MIT License and includes third-party open-source work.", projectLicenseTitle: "OneMind UI Design · MIT", thirdPartyTitle: "Third-party software", viewSource: "View local license", viewIconParkLicense: "View local IconPark license", iconParkNotice: "Icon artwork is derived from IconPark by ByteDance under the Apache License 2.0.", iconParkAdapted: "Icons may be resized, recolored, or adapted to match semantic themes and interaction states.",
    },
    "zh-SG": {
      lang: "zh-SG",
      controls: { language: "语言", displayMode: "显示模式", automatic: "自动", light: "浅色", dark: "深色" },
      navGuide: "标准", navStyle: "风格", navElements: "元素", navComponents: "组件", navPages: "页面",
      titleLead: "把你的系统设计成", titleTail: "一个完整系统。",
      description: "一套受治理的视觉库，为共享 Web 产品打造平静、精准的界面。从意图出发，复用经过验证的模块，并让每种状态保持真实。",
      start: "开始",
      footerIcons: "图标来自 IconPark", licenseOverview: "许可证概览", localLicense: "本地许可证",
      librarySections: "视觉库栏目", startExploring: "开始浏览 UI 视觉库",
      footerNavigation: "页脚导航",
      legalTitle: "开源许可证", legalIntro: "OneMind UI Design 采用 MIT 许可证发布，并包含第三方开源作品。", projectLicenseTitle: "OneMind UI Design · MIT", thirdPartyTitle: "第三方软件", viewSource: "查看本地许可证", viewIconParkLicense: "查看本地 IconPark 许可证", iconParkNotice: "图标作品衍生自 ByteDance 的 IconPark，并依据 Apache License 2.0 使用。", iconParkAdapted: "图标可能会调整尺寸、重新着色或改编，以匹配语义主题和交互状态。",
    },
    "zh-HK": {
      lang: "zh-HK",
      controls: { language: "語言", displayMode: "顯示模式", automatic: "自動", light: "淺色", dark: "深色" },
      navGuide: "標準", navStyle: "風格", navElements: "元素", navComponents: "元件", navPages: "頁面",
      titleLead: "將你的系統設計成", titleTail: "一個完整系統。",
      description: "一套受治理的視覺庫，為共享 Web 產品打造平靜、精準的介面。從意圖出發，重用已驗證的模組，並讓每種狀態保持真實。",
      start: "開始",
      footerIcons: "圖標來自 IconPark", licenseOverview: "授權條款概覽", localLicense: "本地授權條款",
      librarySections: "視覺庫欄目", startExploring: "開始瀏覽 UI 視覺庫",
      footerNavigation: "頁尾導覽",
      legalTitle: "開源授權條款", legalIntro: "OneMind UI Design 依 MIT 授權條款發布，並包含第三方開源作品。", projectLicenseTitle: "OneMind UI Design · MIT", thirdPartyTitle: "第三方軟件", viewSource: "檢視本地授權條款", viewIconParkLicense: "檢視本地 IconPark 授權條款", iconParkNotice: "圖標作品衍生自 ByteDance 的 IconPark，並依 Apache License 2.0 使用。", iconParkAdapted: "圖標可能會調整尺寸、重新著色或改編，以配合語義主題及互動狀態。",
    },
    ja: {
      lang: "ja",
      controls: { language: "言語", displayMode: "表示モード", automatic: "自動", light: "ライト", dark: "ダーク" },
      navGuide: "標準", navStyle: "スタイル", navElements: "要素", navComponents: "コンポーネント", navPages: "ページ",
      titleLead: "あなたのシステムを", titleTail: "ひとつのシステムとして設計。",
      description: "共有Webプロダクトのための、穏やかで正確なインターフェースを支える管理されたビジュアルライブラリ。意図から始め、実証済みのモジュールを再利用し、すべての状態を正確に保ちます。",
      start: "始める",
      footerIcons: "アイコン：IconPark", licenseOverview: "ライセンス概要", localLicense: "ローカルライセンス",
      librarySections: "ライブラリセクション", startExploring: "UIライブラリを見る",
      footerNavigation: "フッターナビゲーション",
      legalTitle: "オープンソースライセンス", legalIntro: "OneMind UI Design は MIT License で公開され、第三者のオープンソース作品を含みます。", projectLicenseTitle: "OneMind UI Design · MIT", thirdPartyTitle: "サードパーティソフトウェア", viewSource: "ローカルライセンスを見る", viewIconParkLicense: "ローカルの IconPark ライセンスを見る", iconParkNotice: "アイコンは ByteDance の IconPark をもとに、Apache License 2.0 に基づいて使用しています。", iconParkAdapted: "アイコンはセマンティックテーマや操作状態に合わせて、サイズ、色、形状を調整する場合があります。",
    },
    ko: {
      lang: "ko",
      controls: { language: "언어", displayMode: "화면 모드", automatic: "자동", light: "라이트", dark: "다크" },
      navGuide: "표준", navStyle: "스타일", navElements: "요소", navComponents: "컴포넌트", navPages: "페이지",
      titleLead: "당신의 시스템을", titleTail: "하나의 시스템으로 설계하세요.",
      description: "공유 웹 제품을 위한 차분하고 정밀한 인터페이스를 만드는 관리형 비주얼 라이브러리입니다. 의도에서 시작하고, 검증된 모듈을 재사용하며, 모든 상태를 정확하게 유지합니다.",
      start: "시작",
      footerIcons: "아이콘: IconPark", licenseOverview: "라이선스 개요", localLicense: "로컬 라이선스",
      librarySections: "라이브러리 섹션", startExploring: "UI 라이브러리 둘러보기",
      footerNavigation: "푸터 탐색",
      legalTitle: "오픈 소스 라이선스", legalIntro: "OneMind UI Design은 MIT License로 공개되며 타사 오픈 소스 저작물을 포함합니다.", projectLicenseTitle: "OneMind UI Design · MIT", thirdPartyTitle: "타사 소프트웨어", viewSource: "로컬 라이선스 보기", viewIconParkLicense: "로컬 IconPark 라이선스 보기", iconParkNotice: "아이콘은 ByteDance의 IconPark를 기반으로 하며 Apache License 2.0에 따라 사용됩니다.", iconParkAdapted: "아이콘은 의미 기반 테마와 상호작용 상태에 맞게 크기, 색상 또는 형태가 조정될 수 있습니다.",
    },
  };

  const settingsCopy = {
    en: {
      foundations: "Foundations", workspace: "Foundation workspace", title: "Design settings", description: "Tune the shared visual foundation.", reset: "Reset", undo: "Undo", save: "Save", saved: "Settings saved.", saveFailed: "Settings could not be saved.", sectionDescription: "Description", sectionAdjustments: "Adjustments", sectionPreview: "Preview area",
      color: "Color", colorDescription: "Choose a preset, then tune semantic roles shared by every page.", colorPreset: "Color preset", neutral: "Neutral", ocean: "Ocean", forest: "Forest", violet: "Violet", semanticRoles: "Semantic roles", colorFormatHelp: "Use Hex or rgb(). Leave a field blank to inherit the active theme.", mainColor: "Main", textColor: "Text", secondaryTextColor: "Secondary text", mutedTextColor: "Muted text", lineColor: "Line", borderColor: "Border", backgroundColor: "Background", surfaceColor: "Surface", selectedColor: "Selected", colorInvalid: "Enter a valid Hex or rgb() color.",
      grid: "Grid", gridDescription: "Set the column structure used by shared page layouts.", columns: "Columns", size: "Size", sizeDescription: "Control the base size that scales type and controls together.", baseSize: "Base size",
      font: "Font", fontDescription: "Select the type character for every shared role.", fontFamily: "Font family", systemSans: "System Sans", humanistSans: "Humanist Sans", editorialSerif: "Editorial Serif", mono: "Monospace",
      spacing: "Spacing", spacingDescription: "Adjust the base rhythm for gaps, padding, and density.", baseSpacing: "Base spacing", radius: "Radius", radiusDescription: "Shape surfaces from precise corners to softer containers.", cornerRadius: "Corner radius",
      elevation: "Elevation", elevationDescription: "Use depth only to explain containment and overlap.", depthLevel: "Depth level", motion: "Motion", motionDescription: "Set transition character while preserving reduced-motion behavior.", motionStyle: "Motion style", reduced: "Reduced", standard: "Standard", expressive: "Expressive",
      livePreview: "Live preview", previewTitle: "Shared interface", ready: "Ready", previewCardTitle: "One calm foundation", previewCardDescription: "Color, type, geometry, and motion stay coherent across every shared surface.", primaryAction: "Primary action", secondaryAction: "Secondary", columnsUnit: "columns",
    },
    "zh-SG": {
      foundations: "基础", workspace: "基础设置工作区", title: "设计设置", description: "调整共享视觉基础。", reset: "重置", undo: "撤销", save: "保存", saved: "设置已保存。", saveFailed: "无法保存设置。", sectionDescription: "说明", sectionAdjustments: "调整项", sectionPreview: "预览区域",
      color: "颜色", colorDescription: "先选择预设，再调整所有页面共享的语义颜色。", colorPreset: "颜色预设", neutral: "中性", ocean: "海洋", forest: "森林", violet: "紫罗兰", semanticRoles: "语义角色", colorFormatHelp: "支持 Hex 或 rgb()。留空则继承当前主题。", mainColor: "主色", textColor: "文字", secondaryTextColor: "次要文字", mutedTextColor: "弱化文字", lineColor: "分隔线", borderColor: "边框", backgroundColor: "背景", surfaceColor: "表面", selectedColor: "选中状态", colorInvalid: "请输入有效的 Hex 或 rgb() 颜色。",
      grid: "网格", gridDescription: "设置共享页面布局使用的列结构。", columns: "列数", size: "尺寸", sizeDescription: "控制同时缩放文字和控件的基础尺寸。", baseSize: "基础尺寸",
      font: "字体", fontDescription: "选择所有共享角色的字体风格。", fontFamily: "字体系列", systemSans: "系统无衬线体", humanistSans: "人文无衬线体", editorialSerif: "编辑衬线体", mono: "等宽字体",
      spacing: "间距", spacingDescription: "调整间隙、内边距和密度的基础节奏。", baseSpacing: "基础间距", radius: "圆角", radiusDescription: "从精确直角到柔和容器调整表面形状。", cornerRadius: "圆角半径",
      elevation: "层级", elevationDescription: "仅用深度表达包含和重叠关系。", depthLevel: "深度级别", motion: "动效", motionDescription: "设置过渡风格，同时保留减少动态效果的行为。", motionStyle: "动效风格", reduced: "精简", standard: "标准", expressive: "灵动",
      livePreview: "实时预览", previewTitle: "共享界面", ready: "就绪", previewCardTitle: "一个平静的基础", previewCardDescription: "颜色、字体、几何和动效在每个共享表面上保持一致。", primaryAction: "主要操作", secondaryAction: "次要操作", columnsUnit: "列",
    },
    "zh-HK": {
      foundations: "基礎", workspace: "基礎設定工作區", title: "設計設定", description: "調整共享視覺基礎。", reset: "重設", undo: "復原", save: "儲存", saved: "設定已儲存。", saveFailed: "無法儲存設定。", sectionDescription: "說明", sectionAdjustments: "調整項", sectionPreview: "預覽區域",
      color: "顏色", colorDescription: "先選擇預設，再調整所有頁面共享的語義顏色。", colorPreset: "顏色預設", neutral: "中性", ocean: "海洋", forest: "森林", violet: "紫羅蘭", semanticRoles: "語義角色", colorFormatHelp: "支援 Hex 或 rgb()。留空則繼承目前主題。", mainColor: "主色", textColor: "文字", secondaryTextColor: "次要文字", mutedTextColor: "弱化文字", lineColor: "分隔線", borderColor: "邊框", backgroundColor: "背景", surfaceColor: "表面", selectedColor: "選取狀態", colorInvalid: "請輸入有效的 Hex 或 rgb() 顏色。",
      grid: "網格", gridDescription: "設定共享頁面佈局使用的欄結構。", columns: "欄數", size: "尺寸", sizeDescription: "控制同時縮放文字和控制項的基礎尺寸。", baseSize: "基礎尺寸",
      font: "字體", fontDescription: "選擇所有共享角色的字體風格。", fontFamily: "字體系列", systemSans: "系統無襯線體", humanistSans: "人文無襯線體", editorialSerif: "編輯襯線體", mono: "等寬字體",
      spacing: "間距", spacingDescription: "調整間隙、內邊距及密度的基礎節奏。", baseSpacing: "基礎間距", radius: "圓角", radiusDescription: "從精確直角到柔和容器調整表面形狀。", cornerRadius: "圓角半徑",
      elevation: "層級", elevationDescription: "只用深度表達包含及重疊關係。", depthLevel: "深度級別", motion: "動效", motionDescription: "設定過渡風格，同時保留減少動態效果的行為。", motionStyle: "動效風格", reduced: "精簡", standard: "標準", expressive: "靈動",
      livePreview: "即時預覽", previewTitle: "共享介面", ready: "就緒", previewCardTitle: "一個平靜的基礎", previewCardDescription: "顏色、字體、幾何及動效在每個共享表面上保持一致。", primaryAction: "主要操作", secondaryAction: "次要操作", columnsUnit: "欄",
    },
    ja: {
      foundations: "基盤", workspace: "基盤ワークスペース", title: "デザイン設定", description: "共有ビジュアル基盤を調整します。", reset: "リセット", undo: "元に戻す", save: "保存", saved: "設定を保存しました。", saveFailed: "設定を保存できませんでした。", sectionDescription: "説明", sectionAdjustments: "調整項目", sectionPreview: "プレビュー領域",
      color: "カラー", colorDescription: "プリセットを選び、全ページで共有するセマンティックカラーを調整します。", colorPreset: "カラープリセット", neutral: "ニュートラル", ocean: "オーシャン", forest: "フォレスト", violet: "バイオレット", semanticRoles: "セマンティックロール", colorFormatHelp: "Hex または rgb() に対応。空欄は現在のテーマを継承します。", mainColor: "メイン", textColor: "テキスト", secondaryTextColor: "セカンダリテキスト", mutedTextColor: "弱いテキスト", lineColor: "区切り線", borderColor: "ボーダー", backgroundColor: "背景", surfaceColor: "サーフェス", selectedColor: "選択状態", colorInvalid: "有効な Hex または rgb() カラーを入力してください。",
      grid: "グリッド", gridDescription: "共有ページレイアウトの列構造を設定します。", columns: "列数", size: "サイズ", sizeDescription: "文字とコントロールを一緒に拡大縮小する基準サイズです。", baseSize: "基準サイズ",
      font: "フォント", fontDescription: "すべての共有ロールの文字特性を選びます。", fontFamily: "フォントファミリー", systemSans: "システムサンセリフ", humanistSans: "ヒューマニストサンセリフ", editorialSerif: "エディトリアルセリフ", mono: "等幅フォント",
      spacing: "スペーシング", spacingDescription: "間隔、余白、密度の基本リズムを調整します。", baseSpacing: "基準間隔", radius: "角丸", radiusDescription: "正確な角から柔らかなコンテナまで形状を調整します。", cornerRadius: "角丸半径",
      elevation: "エレベーション", elevationDescription: "奥行きは包含と重なりの説明にだけ使います。", depthLevel: "奥行きレベル", motion: "モーション", motionDescription: "視覚効果の軽減を保ちながら遷移の特性を設定します。", motionStyle: "モーションスタイル", reduced: "軽減", standard: "標準", expressive: "表現的",
      livePreview: "ライブプレビュー", previewTitle: "共有インターフェース", ready: "準備完了", previewCardTitle: "ひとつの穏やかな基盤", previewCardDescription: "カラー、文字、形状、動きがすべての共有サーフェスで一貫します。", primaryAction: "主要アクション", secondaryAction: "セカンダリ", columnsUnit: "列",
    },
    ko: {
      foundations: "기초", workspace: "기초 설정 작업 공간", title: "디자인 설정", description: "공유 시각 기반을 조정하세요.", reset: "재설정", undo: "실행 취소", save: "저장", saved: "설정을 저장했습니다.", saveFailed: "설정을 저장하지 못했습니다.", sectionDescription: "설명", sectionAdjustments: "조정 항목", sectionPreview: "미리보기 영역",
      color: "색상", colorDescription: "프리셋을 선택한 뒤 모든 페이지가 공유할 의미 기반 색상을 조정하세요.", colorPreset: "색상 프리셋", neutral: "중립", ocean: "오션", forest: "포레스트", violet: "바이올렛", semanticRoles: "의미 역할", colorFormatHelp: "Hex 또는 rgb()를 지원합니다. 비워 두면 현재 테마를 따릅니다.", mainColor: "메인", textColor: "텍스트", secondaryTextColor: "보조 텍스트", mutedTextColor: "약한 텍스트", lineColor: "구분선", borderColor: "테두리", backgroundColor: "배경", surfaceColor: "표면", selectedColor: "선택 상태", colorInvalid: "유효한 Hex 또는 rgb() 색상을 입력하세요.",
      grid: "그리드", gridDescription: "공유 페이지 레이아웃의 열 구조를 설정하세요.", columns: "열 수", size: "크기", sizeDescription: "글꼴과 컨트롤을 함께 조절하는 기본 크기를 설정하세요.", baseSize: "기본 크기",
      font: "글꼴", fontDescription: "모든 공유 역할에 적용할 글꼴 특성을 선택하세요.", fontFamily: "글꼴 모음", systemSans: "시스템 산세리프", humanistSans: "휴머니스트 산세리프", editorialSerif: "에디토리얼 세리프", mono: "고정폭 글꼴",
      spacing: "간격", spacingDescription: "여백, 패딩 및 밀도의 기본 리듬을 조절하세요.", baseSpacing: "기본 간격", radius: "모서리", radiusDescription: "정교한 각부터 부드러운 컨테이너까지 형태를 조절하세요.", cornerRadius: "모서리 반경",
      elevation: "입체감", elevationDescription: "깊이는 포함 및 겹침 관계를 설명할 때만 사용하세요.", depthLevel: "깊이 단계", motion: "모션", motionDescription: "모션 감소 동작을 유지하면서 전환 특성을 설정하세요.", motionStyle: "모션 스타일", reduced: "감소", standard: "표준", expressive: "표현형",
      livePreview: "실시간 미리보기", previewTitle: "공유 인터페이스", ready: "준비됨", previewCardTitle: "하나의 차분한 기반", previewCardDescription: "색상, 글꼴, 형태 및 모션이 모든 공유 화면에서 일관되게 유지됩니다.", primaryAction: "주요 작업", secondaryAction: "보조 작업", columnsUnit: "열",
    },
  };

  const settingsStorageKey = "one-mind-ui.settings.v1";
  const settingsColorDefaults = { main: "", text: "", secondary: "", muted: "", line: "", border: "", background: "", surface: "", selected: "" };
  const settingsDefaults = { color: "neutral", colors: settingsColorDefaults, grid: 12, size: 16, font: "system", spacing: 8, radius: 8, elevation: 1, motion: "standard" };
  const settingsAccents = { neutral: "var(--one-mind-text-primary)", ocean: "#0969da", forest: "#087a42", violet: "#7656d6" };
  const settingsAccentContrast = { neutral: "var(--one-mind-page-background)", ocean: "#ffffff", forest: "#ffffff", violet: "#ffffff" };
  const settingsFonts = {
    system: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
    humanist: 'Avenir Next, Avenir, "Segoe UI", sans-serif',
    serif: 'Iowan Old Style, Charter, Georgia, serif',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", monospace',
  };
  const settingsShadows = ["none", "var(--library-shadow-1)", "var(--library-shadow-2)", "var(--library-shadow-3)"];
  const settingsDurations = { reduced: "1ms", standard: "180ms", expressive: "320ms" };
  const settingsColorTokens = {
    main: "--settings-accent",
    text: "--one-mind-text-primary",
    secondary: "--one-mind-text-secondary",
    muted: "--one-mind-text-muted",
    line: "--library-line",
    border: "--one-mind-border",
    background: "--one-mind-page-background",
    surface: "--one-mind-surface",
    selected: "--one-mind-surface-subtle",
  };

  function isSupportedColor(value) {
    if (value === "") return true;
    const formatIsSupported = /^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value) || /^rgb\(/i.test(value);
    return formatIsSupported && window.CSS?.supports?.("color", value) === true;
  }

  function readableColor(background, fallback) {
    if (!background || !document.body) return fallback;
    const probe = document.createElement("span");
    probe.style.color = background;
    probe.hidden = true;
    document.body.append(probe);
    const channels = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    probe.remove();
    if (!channels || channels.length !== 3) return fallback;
    const luminance = channels.map((channel) => channel / 255).map((channel) => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
    const whiteContrast = 1.05 / (luminance + .05);
    const darkLuminance = .005605;
    const darkContrast = (luminance + .05) / (darkLuminance + .05);
    return whiteContrast >= darkContrast ? "#ffffff" : "#111111";
  }

  function clampSetting(value, min, max, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
  }

  function normalizeSettings(candidate) {
    const state = { ...settingsDefaults, ...(candidate && typeof candidate === "object" ? candidate : {}) };
    const candidateColors = candidate && typeof candidate.colors === "object" ? candidate.colors : {};
    state.colors = { ...settingsColorDefaults, ...candidateColors };
    Object.keys(state.colors).forEach((role) => {
      const value = typeof state.colors[role] === "string" ? state.colors[role].trim() : "";
      state.colors[role] = isSupportedColor(value) ? value : "";
    });
    if (!Object.hasOwn(settingsAccents, state.color)) state.color = settingsDefaults.color;
    if (!Object.hasOwn(settingsFonts, state.font)) state.font = settingsDefaults.font;
    if (!Object.hasOwn(settingsDurations, state.motion)) state.motion = settingsDefaults.motion;
    state.grid = clampSetting(state.grid, 4, 12, settingsDefaults.grid);
    state.size = clampSetting(state.size, 14, 20, settingsDefaults.size);
    state.spacing = clampSetting(state.spacing, 4, 12, settingsDefaults.spacing);
    state.radius = clampSetting(state.radius, 0, 16, settingsDefaults.radius);
    state.elevation = clampSetting(state.elevation, 0, 3, settingsDefaults.elevation);
    return state;
  }

  function loadSettings() {
    try {
      return normalizeSettings(JSON.parse(readPreference(settingsStorageKey) || "null"));
    } catch (_) {
      return { ...settingsDefaults };
    }
  }

  function applySettings(state) {
    const normalized = normalizeSettings(state);
    const root = document.documentElement;
    const setSemanticOverride = (property, value) => value ? root.style.setProperty(property, value) : root.style.removeProperty(property);
    setSemanticOverride("--one-mind-text-primary", normalized.colors.text);
    setSemanticOverride("--one-mind-text-secondary", normalized.colors.secondary);
    setSemanticOverride("--one-mind-text-muted", normalized.colors.muted);
    setSemanticOverride("--one-mind-border", normalized.colors.border);
    setSemanticOverride("--one-mind-page-background", normalized.colors.background);
    setSemanticOverride("--one-mind-surface", normalized.colors.surface);
    setSemanticOverride("--one-mind-surface-subtle", normalized.colors.selected);
    setSemanticOverride("--library-line", normalized.colors.line);
    setSemanticOverride("--library-background", normalized.colors.background);
    setSemanticOverride("--library-surface", normalized.colors.surface);
    setSemanticOverride("--library-selected", normalized.colors.selected);
    const accent = normalized.colors.main || settingsAccents[normalized.color];
    const accentContrast = normalized.colors.main ? readableColor(normalized.colors.main, "#ffffff") : settingsAccentContrast[normalized.color];
    root.style.setProperty("--settings-accent", accent);
    root.style.setProperty("--settings-accent-contrast", accentContrast);
    root.style.setProperty("--settings-grid-columns", normalized.grid);
    root.style.setProperty("--settings-card-min", `${510 - (normalized.grid * 20)}px`);
    root.style.setProperty("--settings-content-width", `${560 + (normalized.grid * 24)}px`);
    root.style.setProperty("--settings-page-max", `${240 + (normalized.grid * 100)}px`);
    root.style.setProperty("--settings-legal-max", `${Math.min(960, 240 + (normalized.grid * 100))}px`);
    root.style.setProperty("--settings-base-size", `${normalized.size}px`);
    root.style.setProperty("--settings-scale", normalized.size / 16);
    root.style.setProperty("--settings-type-step", `${normalized.size - 16}px`);
    root.style.setProperty("--settings-control-height", `${40 * (normalized.size / 16)}px`);
    root.style.setProperty("--settings-font-family", settingsFonts[normalized.font]);
    root.style.setProperty("--settings-space", `${normalized.spacing}px`);
    root.style.setProperty("--settings-radius", `${normalized.radius}px`);
    root.style.setProperty("--settings-shadow", settingsShadows[normalized.elevation]);
    root.style.setProperty("--settings-motion-duration", settingsDurations[normalized.motion]);
    root.style.setProperty("--one-mind-font-sans", settingsFonts[normalized.font]);
    root.style.setProperty("--library-accent", accent);
    root.style.setProperty("--library-radius-small", `${normalized.radius / 2}px`);
    root.style.setProperty("--library-radius-medium", `${normalized.radius}px`);
    root.style.setProperty("--library-space-1", `${normalized.spacing / 2}px`);
    root.style.setProperty("--library-space-2", `${normalized.spacing}px`);
    root.style.setProperty("--library-space-3", `${normalized.spacing * 1.5}px`);
    root.style.setProperty("--library-space-4", `${normalized.spacing * 2}px`);
    root.style.setProperty("--library-space-6", `${normalized.spacing * 3}px`);
    root.style.setProperty("--library-space-8", `${normalized.spacing * 4}px`);
    root.dataset.settingsColor = normalized.color;
    root.dataset.settingsFont = normalized.font;
    root.dataset.settingsMotion = normalized.motion;
    return normalized;
  }

  const standardsCopy = {
    en: {
      library: "Library navigation", libraryTitle: "Library", sections: "Standards sections", drawerKicker: "System foundation", drawerTitle: "Standards", drawerNoteTitle: "Working agreement", drawerNote: "Set the intent here before building reusable elements and modules.", markdownPreview: "Markdown preview",
      kicker: "One system, shared rules", title: "Design standards", description: "Define the intent, visual direction, state behavior, and authority boundaries that every reusable layer must follow.",
      briefTitle: "Design brief", briefDescription: "Record the objective, audience, structural content slots, constraints, and assumptions without storing business records.", required: "Required", briefDetail: "Primary task, entry condition, completion evidence, and non-goals.",
      visualTitle: "Visual direction", visualDescription: "Start from OneMind's calm neutral system and record only objective-specific differences.", baseline: "Baseline", visualDetail: "System sans, semantic surfaces, restrained depth, precise corners, and blue reserved for focus or links.",
      layoutTitle: "Layout & hierarchy", layoutDescription: "Record the shell, navigation, reading order, action slots, neutral page modules, and desktop host constraints.", layoutDetail: "Clear title grammar, stable rails, measured content insets, and accessible interactive targets.",
      stateTitle: "State contract", stateDescription: "Define loading, empty, offline, stale, error, blocked, permission, success, recovery, and interaction states.", truthRule: "Truth rule", stateDetail: "Never show success until the authoritative adapter confirms it.",
      authorityTitle: "Authority & host", authorityDescription: "Keep the design library local and static while documenting external and native authority as interface boundaries.", renderer: "Renderer", authorityDetail: "One offline HTML, CSS, and JavaScript artifact opened directly from local files.",
      validationTitle: "Validation plan", validationDescription: "Record routes, themes, host sizes, locales, accessibility checks, tests, builds, and same-artifact evidence.", locales: "Locales", validationDetail: "English, Singapore Simplified Chinese, Hong Kong Traditional Chinese, Korean, and Japanese.",
    },
    "zh-SG": {
      library: "视觉库导航", libraryTitle: "视觉库", sections: "标准章节", drawerKicker: "系统基础", drawerTitle: "标准", drawerNoteTitle: "工作约定", drawerNote: "先在这里明确意图，再构建可复用元素和模块。", markdownPreview: "Markdown 预览",
      kicker: "一个系统，共享规则", title: "设计标准", description: "定义每个可复用层都必须遵循的意图、视觉方向、状态行为和权限边界。",
      briefTitle: "设计简介", briefDescription: "记录目标、受众、内容结构、限制和假设，不存储业务记录。", required: "必填", briefDetail: "主要任务、进入条件、完成证据和非目标。",
      visualTitle: "视觉方向", visualDescription: "从 OneMind 平静的中性系统出发，只记录目标特有的差异。", baseline: "基线", visualDetail: "系统无衬线字体、语义表面、克制层次、精确圆角；蓝色仅用于焦点或链接。",
      layoutTitle: "布局与层级", layoutDescription: "记录外壳、导航、阅读顺序、操作位置、中性页面模块和桌面端限制。", layoutDetail: "清晰的标题规则、稳定侧栏、适度内容边距和可访问操作目标。",
      stateTitle: "状态契约", stateDescription: "定义加载、空白、离线、过期、错误、受阻、权限、成功、恢复和交互状态。", truthRule: "真实性规则", stateDetail: "在权威适配器确认之前绝不显示成功。",
      authorityTitle: "权限与宿主", authorityDescription: "设计库保持本地静态，同时仅以接口边界记录外部与原生权限。", renderer: "渲染器", authorityDetail: "直接从本地文件打开同一份离线 HTML、CSS 和 JavaScript。",
      validationTitle: "验证计划", validationDescription: "记录路由、主题、宿主尺寸、语言、无障碍检查、测试、构建和同一产物证据。", locales: "语言", validationDetail: "英语、新加坡简体中文、香港繁体中文、韩语和日语。",
    },
    "zh-HK": {
      library: "視覺庫導覽", libraryTitle: "視覺庫", sections: "標準章節", drawerKicker: "系統基礎", drawerTitle: "標準", drawerNoteTitle: "工作約定", drawerNote: "先在此明確意圖，再建立可重用元素及模組。", markdownPreview: "Markdown 預覽",
      kicker: "一個系統，共享規則", title: "設計標準", description: "定義每個可重用層都必須遵循的意圖、視覺方向、狀態行為及權限邊界。",
      briefTitle: "設計簡介", briefDescription: "記錄目標、受眾、內容結構、限制及假設，而不儲存業務記錄。", required: "必填", briefDetail: "主要任務、進入條件、完成證據及非目標。",
      visualTitle: "視覺方向", visualDescription: "由 OneMind 平靜的中性系統開始，只記錄目標特有的差異。", baseline: "基線", visualDetail: "系統無襯線字體、語義表面、克制層次、精確圓角；藍色只用於焦點或連結。",
      layoutTitle: "佈局與層級", layoutDescription: "記錄外殼、導覽、閱讀順序、操作位置、中性頁面模組及桌面宿主限制。", layoutDetail: "清晰標題規則、穩定側欄、適度內容邊距及可存取操作目標。",
      stateTitle: "狀態契約", stateDescription: "定義載入、空白、離線、過期、錯誤、受阻、權限、成功、復原及互動狀態。", truthRule: "真實性規則", stateDetail: "在權威適配器確認前絕不顯示成功。",
      authorityTitle: "權限與宿主", authorityDescription: "設計庫保持本地靜態，同時只以介面邊界記錄外部與原生權限。", renderer: "渲染器", authorityDetail: "直接從本地檔案開啟同一份離線 HTML、CSS 及 JavaScript。",
      validationTitle: "驗證計劃", validationDescription: "記錄路由、主題、宿主尺寸、語言、無障礙檢查、測試、構建及同一產物證據。", locales: "語言", validationDetail: "英語、新加坡簡體中文、香港繁體中文、韓語及日語。",
    },
    ja: {
      library: "ライブラリナビゲーション", libraryTitle: "ライブラリ", sections: "標準セクション", drawerKicker: "システム基盤", drawerTitle: "標準", drawerNoteTitle: "作業の合意", drawerNote: "再利用可能な要素やモジュールを作る前に、ここで意図を定めます。", markdownPreview: "Markdown プレビュー",
      kicker: "ひとつのシステム、共有ルール", title: "デザイン標準", description: "すべての再利用レイヤーが従う意図、視覚方針、状態の振る舞い、権限境界を定義します。",
      briefTitle: "デザイン概要", briefDescription: "業務記録を保存せず、目的、対象、構造、制約、前提を記録します。", required: "必須", briefDetail: "主要タスク、開始条件、完了の証拠、対象外。",
      visualTitle: "視覚方針", visualDescription: "OneMind の穏やかなニュートラル基盤から始め、目的固有の差分だけを記録します。", baseline: "基準", visualDetail: "システムサンセリフ、セマンティックな面、控えめな奥行き、正確な角。青はフォーカスやリンクに限定。",
      layoutTitle: "レイアウトと階層", layoutDescription: "シェル、ナビゲーション、読み順、操作位置、中立モジュール、デスクトップ制約を記録します。", layoutDetail: "明確なタイトル、安定したレール、適切な余白、操作しやすいターゲット。",
      stateTitle: "状態契約", stateDescription: "読み込み、空、オフライン、古い状態、エラー、権限、成功、回復、操作状態を定義します。", truthRule: "真実性ルール", stateDetail: "権威あるアダプターの確認前に成功を表示しません。",
      authorityTitle: "権限とホスト", authorityDescription: "デザインライブラリをローカルかつ静的に保ち、外部とネイティブの権限はインターフェース境界として記録します。", renderer: "レンダラー", authorityDetail: "同じオフライン HTML、CSS、JavaScript をローカルファイルから直接開きます。",
      validationTitle: "検証計画", validationDescription: "ルート、テーマ、サイズ、言語、アクセシビリティ、テスト、ビルド、同一成果物の証拠を記録します。", locales: "言語", validationDetail: "英語、簡体字中国語、繁体字中国語、韓国語、日本語。",
    },
    ko: {
      library: "라이브러리 탐색", libraryTitle: "라이브러리", sections: "표준 섹션", drawerKicker: "시스템 기반", drawerTitle: "표준", drawerNoteTitle: "작업 원칙", drawerNote: "재사용 요소와 모듈을 만들기 전에 여기에서 의도를 정하세요.", markdownPreview: "Markdown 미리보기",
      kicker: "하나의 시스템, 공유 규칙", title: "디자인 표준", description: "모든 재사용 계층이 따라야 할 의도, 시각 방향, 상태 동작, 권한 경계를 정의합니다.",
      briefTitle: "디자인 개요", briefDescription: "비즈니스 기록을 저장하지 않고 목표, 대상, 구조, 제약, 가정을 기록합니다.", required: "필수", briefDetail: "주요 작업, 진입 조건, 완료 근거 및 비목표.",
      visualTitle: "시각 방향", visualDescription: "OneMind의 차분한 중립 시스템에서 시작하고 목표별 차이만 기록합니다.", baseline: "기준", visualDetail: "시스템 산세리프, 의미 기반 표면, 절제된 깊이, 정밀한 모서리. 파란색은 포커스와 링크에만 사용.",
      layoutTitle: "레이아웃과 계층", layoutDescription: "셸, 탐색, 읽기 순서, 작업 위치, 중립 페이지 모듈 및 데스크톱 제약을 기록합니다.", layoutDetail: "명확한 제목 규칙, 안정적인 레일, 적절한 여백, 접근 가능한 조작 대상.",
      stateTitle: "상태 계약", stateDescription: "로딩, 빈 상태, 오프라인, 오래된 상태, 오류, 권한, 성공, 복구 및 상호작용 상태를 정의합니다.", truthRule: "진실성 규칙", stateDetail: "권한 있는 어댑터가 확인하기 전에는 성공을 표시하지 않습니다.",
      authorityTitle: "권한과 호스트", authorityDescription: "디자인 라이브러리는 로컬 정적 상태로 유지하고 외부 및 네이티브 권한은 인터페이스 경계로만 기록합니다.", renderer: "렌더러", authorityDetail: "동일한 오프라인 HTML, CSS, JavaScript를 로컬 파일에서 직접 엽니다.",
      validationTitle: "검증 계획", validationDescription: "경로, 테마, 크기, 언어, 접근성, 테스트, 빌드 및 동일 산출물 근거를 기록합니다.", locales: "언어", validationDetail: "영어, 싱가포르 중국어 간체, 홍콩 중국어 번체, 한국어, 일본어.",
    },
  };

  const styleCopy = {
    en: {
      sections: "Style sections", drawerKicker: "Visual language", drawerTitle: "Style", drawerNoteTitle: "Style contract", drawerNote: "Set shared visual rules here before adjusting elements and components.",
      kicker: "One language, every surface", title: "Style system", description: "Define the shared visual language that turns standards into consistent elements, components, and pages.",
      principlesTitle: "Style principles", principlesDescription: "Keep every surface calm, precise, trustworthy, and fast to scan.", baseline: "Baseline", principlesDetail: "Restrained neutrals, clear hierarchy, generous breathing room, subtle depth, and purposeful accent color.",
      colorTitle: "Color", colorDescription: "Use semantic roles so light and dark surfaces preserve the same meaning.", usage: "Usage", colorDetail: "Neutrals carry identity; blue supports links, focus, selection, and information without becoming every primary action.",
      typographyTitle: "Typography", typographyDescription: "Use the system sans stack with a compact, readable hierarchy.", typographyDetail: "One clear page title, logical headings, readable line lengths, and tabular numerals for changing values.",
      spacingTitle: "Spacing & layout", spacingDescription: "Build rhythm from shared spacing and grid tokens rather than page-specific offsets.", spacingDetail: "Align rails, titles, content, and actions to a stable grid while allowing localized text to wrap without clipping.",
      shapeTitle: "Shape & depth", shapeDescription: "Use precise corners and restrained elevation to explain containment and overlap.", shapeDetail: "Reserve stronger shadows and higher layers for temporary surfaces such as dialogs, menus, and feedback.",
      motionTitle: "Motion", motionDescription: "Use short, quiet transitions to clarify state changes without delaying work.", accessibility: "Accessibility", motionDetail: "Respect reduced motion and never rely on movement alone to communicate meaning.",
    },
    "zh-SG": {
      sections: "风格章节", drawerKicker: "视觉语言", drawerTitle: "风格", drawerNoteTitle: "风格契约", drawerNote: "先在这里设定共享视觉规则，再调整元素和组件。",
      kicker: "一种语言，贯穿所有界面", title: "风格系统", description: "定义共享视觉语言，让标准转化为一致的元素、组件和页面。",
      principlesTitle: "风格原则", principlesDescription: "让每个界面保持平静、精准、可信且便于快速浏览。", baseline: "基线", principlesDetail: "克制的中性色、清晰层级、充足留白、微妙深度和有目的的强调色。",
      colorTitle: "颜色", colorDescription: "使用语义角色，让浅色与深色界面表达相同含义。", usage: "用法", colorDetail: "中性色承载识别；蓝色用于链接、焦点、选择和信息，而不是所有主要操作。",
      typographyTitle: "字体排版", typographyDescription: "使用系统无衬线字体和紧凑、易读的层级。", typographyDetail: "一个清晰的页面标题、合理的标题层级、可读行宽，以及用于变化数值的等宽数字。",
      spacingTitle: "间距与布局", spacingDescription: "从共享间距和网格令牌建立节奏，避免页面专属偏移。", spacingDetail: "将侧栏、标题、内容和操作对齐到稳定网格，并允许本地化文本换行而不被裁切。",
      shapeTitle: "形状与深度", shapeDescription: "用精确圆角和克制层次说明包含与重叠关系。", shapeDetail: "较强阴影和较高层级仅用于对话框、菜单和反馈等临时界面。",
      motionTitle: "动效", motionDescription: "用短暂、安静的过渡说明状态变化，不延迟工作。", accessibility: "无障碍", motionDetail: "尊重减少动态效果设置，绝不只靠移动表达含义。",
    },
    "zh-HK": {
      sections: "風格章節", drawerKicker: "視覺語言", drawerTitle: "風格", drawerNoteTitle: "風格契約", drawerNote: "先在此設定共享視覺規則，再調整元素及元件。",
      kicker: "一種語言，貫穿所有介面", title: "風格系統", description: "定義共享視覺語言，讓標準轉化為一致的元素、元件及頁面。",
      principlesTitle: "風格原則", principlesDescription: "讓每個介面保持平靜、精準、可信並便於快速瀏覽。", baseline: "基線", principlesDetail: "克制的中性色、清晰層級、充足留白、細緻深度及有目的的強調色。",
      colorTitle: "顏色", colorDescription: "使用語意角色，讓淺色及深色介面保留相同含義。", usage: "用法", colorDetail: "中性色承載識別；藍色用於連結、焦點、選取及資訊，而不是所有主要操作。",
      typographyTitle: "字體排版", typographyDescription: "使用系統無襯線字體和緊湊、易讀的層級。", typographyDetail: "一個清晰的頁面標題、合理的標題層級、可讀行寬，以及用於變動數值的等寬數字。",
      spacingTitle: "間距與佈局", spacingDescription: "從共享間距及網格權杖建立節奏，避免頁面專屬偏移。", spacingDetail: "將側欄、標題、內容及操作對齊穩定網格，並讓本地化文字換行而不被裁切。",
      shapeTitle: "形狀與深度", shapeDescription: "用精確圓角及克制層次說明包含與重疊關係。", shapeDetail: "較強陰影及較高層級只用於對話框、選單及回饋等臨時介面。",
      motionTitle: "動效", motionDescription: "用短暫、安靜的過渡說明狀態變化，不延誤工作。", accessibility: "無障礙", motionDetail: "尊重減少動態效果設定，絕不只靠移動表達含義。",
    },
    ja: {
      sections: "スタイルセクション", drawerKicker: "視覚言語", drawerTitle: "スタイル", drawerNoteTitle: "スタイル契約", drawerNote: "要素やコンポーネントを調整する前に、共有する視覚ルールを定めます。",
      kicker: "ひとつの言語を、すべての画面へ", title: "スタイルシステム", description: "標準を一貫した要素、コンポーネント、ページへ変換する共有視覚言語を定義します。",
      principlesTitle: "スタイル原則", principlesDescription: "すべての画面を穏やかで正確、信頼でき、素早く読み取れる状態に保ちます。", baseline: "基準", principlesDetail: "控えめなニュートラル、明確な階層、十分な余白、繊細な奥行き、目的のあるアクセント色。",
      colorTitle: "カラー", colorDescription: "セマンティックな役割により、ライトとダークで同じ意味を保ちます。", usage: "用途", colorDetail: "ニュートラルを基調とし、青はリンク、フォーカス、選択、情報に使い、すべての主要操作には使いません。",
      typographyTitle: "タイポグラフィ", typographyDescription: "システムサンセリフと、簡潔で読みやすい階層を使います。", typographyDetail: "明確なページタイトル、論理的な見出し、読みやすい行長、変化する数値には等幅数字を使います。",
      spacingTitle: "余白とレイアウト", spacingDescription: "ページ固有の位置調整ではなく、共有する余白とグリッドのトークンでリズムを作ります。", spacingDetail: "レール、タイトル、内容、操作を安定したグリッドに揃え、翻訳文は切れずに折り返せるようにします。",
      shapeTitle: "形状と奥行き", shapeDescription: "正確な角と控えめなエレベーションで包含と重なりを説明します。", shapeDetail: "強い影と高いレイヤーは、ダイアログ、メニュー、フィードバックなど一時的な面に限定します。",
      motionTitle: "モーション", motionDescription: "短く静かなトランジションで、作業を遅らせずに状態変化を示します。", accessibility: "アクセシビリティ", motionDetail: "視差効果を減らす設定を尊重し、動きだけで意味を伝えません。",
    },
    ko: {
      sections: "스타일 섹션", drawerKicker: "시각 언어", drawerTitle: "스타일", drawerNoteTitle: "스타일 계약", drawerNote: "요소와 컴포넌트를 조정하기 전에 공유 시각 규칙을 설정하세요.",
      kicker: "하나의 언어, 모든 화면", title: "스타일 시스템", description: "표준을 일관된 요소, 컴포넌트, 페이지로 바꾸는 공유 시각 언어를 정의합니다.",
      principlesTitle: "스타일 원칙", principlesDescription: "모든 화면을 차분하고 정밀하며 신뢰할 수 있고 빠르게 읽을 수 있게 유지합니다.", baseline: "기준", principlesDetail: "절제된 중립색, 명확한 계층, 넉넉한 여백, 은은한 깊이, 목적 있는 강조색.",
      colorTitle: "색상", colorDescription: "의미 기반 역할을 사용해 라이트와 다크 화면에서 같은 의미를 유지합니다.", usage: "사용", colorDetail: "중립색을 기본으로 하고 파란색은 링크, 포커스, 선택, 정보에 사용하되 모든 주요 작업에 쓰지 않습니다.",
      typographyTitle: "타이포그래피", typographyDescription: "시스템 산세리프와 간결하고 읽기 쉬운 계층을 사용합니다.", typographyDetail: "명확한 페이지 제목 하나, 논리적인 제목 구조, 읽기 쉬운 줄 길이, 변하는 값에는 고정폭 숫자를 사용합니다.",
      spacingTitle: "간격 및 레이아웃", spacingDescription: "페이지별 오프셋 대신 공유 간격과 그리드 토큰으로 리듬을 만듭니다.", spacingDetail: "레일, 제목, 콘텐츠, 작업을 안정된 그리드에 맞추고 번역문이 잘리지 않고 줄바꿈되게 합니다.",
      shapeTitle: "형태 및 깊이", shapeDescription: "정밀한 모서리와 절제된 높이로 포함과 겹침을 설명합니다.", shapeDetail: "강한 그림자와 높은 레이어는 대화상자, 메뉴, 피드백 같은 임시 화면에만 사용합니다.",
      motionTitle: "모션", motionDescription: "짧고 조용한 전환으로 작업을 늦추지 않으면서 상태 변화를 설명합니다.", accessibility: "접근성", motionDetail: "모션 감소 설정을 존중하고 움직임만으로 의미를 전달하지 않습니다.",
    },
  };

  const catalogCopy = {
    en: {
      componentSections: "Component categories", pageSections: "Page categories",
      componentDrawerKicker: "Reusable system", componentDrawerTitle: "Components", navigationGroup: "Navigation & shell", dataGroup: "Data & status", formsGroup: "Forms & workflows", publicGroup: "Public & host", componentNoteTitle: "Reuse contract", componentNote: "Business records belong only to the consuming feature.", componentKicker: "Interaction building blocks", componentTitle: "Components", componentDescription: "Reusable behavior and structure for shared product surfaces, grouped by responsibility.", componentSectionDescription: "Description", componentSectionAdjustments: "Adjustments", componentSectionPreview: "Preview area", componentNoAdjustments: "No component-specific adjustments are documented.",
      pageDrawerKicker: "Compositions", pageDrawerTitle: "Pages", pageModules: "Page modules", pagePatterns: "Page patterns", pageNoteTitle: "Composition rule", pageNote: "Compose complete journeys from proven elements and components.", pageKicker: "From modules to journeys", pageTitle: "Pages & patterns", pageDescription: "Compositions for complete, state-aware product journeys and host boundaries.",
    },
    "zh-SG": {
      componentSections: "组件分类", pageSections: "页面分类",
      componentDrawerKicker: "可复用系统", componentDrawerTitle: "组件", navigationGroup: "导航与外壳", dataGroup: "数据与状态", formsGroup: "表单与流程", publicGroup: "公共界面与宿主", componentNoteTitle: "复用契约", componentNote: "业务记录只属于使用该组件的功能。", componentKicker: "交互构件", componentTitle: "组件", componentDescription: "按职责组织，为共享产品界面提供可复用的行为与结构。", componentSectionDescription: "说明", componentSectionAdjustments: "调整项", componentSectionPreview: "预览区域", componentNoAdjustments: "暂无组件专属调整项。",
      pageDrawerKicker: "组合", pageDrawerTitle: "页面", pageModules: "页面模块", pagePatterns: "页面模式", pageNoteTitle: "组合规则", pageNote: "使用经过验证的元素和组件组合完整旅程。", pageKicker: "从模块到旅程", pageTitle: "页面与模式", pageDescription: "用于完整、有状态产品旅程和宿主边界的组合。",
    },
    "zh-HK": {
      componentSections: "元件分類", pageSections: "頁面分類",
      componentDrawerKicker: "可重用系統", componentDrawerTitle: "元件", navigationGroup: "導覽與外殼", dataGroup: "資料與狀態", formsGroup: "表單與流程", publicGroup: "公共介面與宿主", componentNoteTitle: "重用契約", componentNote: "業務記錄只屬於使用該元件的功能。", componentKicker: "互動構件", componentTitle: "元件", componentDescription: "按職責組織，為共享產品介面提供可重用的行為及結構。", componentSectionDescription: "說明", componentSectionAdjustments: "調整項", componentSectionPreview: "預覽區域", componentNoAdjustments: "暫無元件專屬調整項。",
      pageDrawerKicker: "組合", pageDrawerTitle: "頁面", pageModules: "頁面模組", pagePatterns: "頁面模式", pageNoteTitle: "組合規則", pageNote: "使用已驗證的元素及元件組合完整旅程。", pageKicker: "從模組到旅程", pageTitle: "頁面與模式", pageDescription: "用於完整、具狀態產品旅程及宿主邊界的組合。",
    },
    ja: {
      componentSections: "コンポーネント分類", pageSections: "ページ分類",
      componentDrawerKicker: "再利用システム", componentDrawerTitle: "コンポーネント", navigationGroup: "ナビゲーションとシェル", dataGroup: "データと状態", formsGroup: "フォームとワークフロー", publicGroup: "公開画面とホスト", componentNoteTitle: "再利用契約", componentNote: "業務レコードは利用する機能だけが保持します。", componentKicker: "インタラクション構成要素", componentTitle: "コンポーネント", componentDescription: "共有プロダクト画面の再利用可能な振る舞いと構造を、責任ごとに整理します。", componentSectionDescription: "説明", componentSectionAdjustments: "調整項目", componentSectionPreview: "プレビュー領域", componentNoAdjustments: "コンポーネント固有の調整項目はありません。",
      pageDrawerKicker: "構成", pageDrawerTitle: "ページ", pageModules: "ページモジュール", pagePatterns: "ページパターン", pageNoteTitle: "構成ルール", pageNote: "実証済みの要素とコンポーネントから完全なジャーニーを構成します。", pageKicker: "モジュールからジャーニーへ", pageTitle: "ページとパターン", pageDescription: "完全で状態を持つプロダクトジャーニーとホスト境界のための構成です。",
    },
    ko: {
      componentSections: "컴포넌트 분류", pageSections: "페이지 분류",
      componentDrawerKicker: "재사용 시스템", componentDrawerTitle: "컴포넌트", navigationGroup: "탐색 및 셸", dataGroup: "데이터 및 상태", formsGroup: "양식 및 워크플로", publicGroup: "공개 화면 및 호스트", componentNoteTitle: "재사용 계약", componentNote: "비즈니스 레코드는 사용하는 기능에서만 보관합니다.", componentKicker: "상호작용 구성 요소", componentTitle: "컴포넌트", componentDescription: "공유 제품 화면을 위한 재사용 가능한 동작과 구조를 책임별로 구성합니다.", componentSectionDescription: "설명", componentSectionAdjustments: "조정 항목", componentSectionPreview: "미리보기 영역", componentNoAdjustments: "컴포넌트별 조정 항목이 문서화되지 않았습니다.",
      pageDrawerKicker: "구성", pageDrawerTitle: "페이지", pageModules: "페이지 모듈", pagePatterns: "페이지 패턴", pageNoteTitle: "구성 규칙", pageNote: "검증된 요소와 컴포넌트로 완전한 여정을 구성합니다.", pageKicker: "모듈에서 여정으로", pageTitle: "페이지 및 패턴", pageDescription: "완전하고 상태를 인식하는 제품 여정과 호스트 경계를 위한 구성입니다.",
    },
  };

  function readPreference(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function writePreference(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (_) { return false; }
  }

  function resolvedTheme(mode) {
    if (mode === "light" || mode === "dark") return mode;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme, toggle) {
    document.documentElement.dataset.libraryTheme = theme;
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.textContent = theme === "dark" ? "Light preview" : "Dark preview";
    }
    if (window.libraryDotSea) window.libraryDotSea.redraw();
    document.dispatchEvent(new CustomEvent("library-settings-theme", { detail: { theme } }));
  }

  function applyHomeCopy(locale, actions) {
    const copy = homeCopy[locale] || homeCopy.en;
    document.documentElement.lang = copy.lang;
    document.querySelectorAll("[data-copy]").forEach((element) => {
      const value = copy[element.dataset.copy];
      if (value) element.textContent = value;
    });
    document.querySelector(".library-home-menu")?.setAttribute("aria-label", copy.librarySections);
    document.querySelector("#library-navigation")?.setAttribute("aria-label", copy.startExploring);
    document.querySelector(".library-home-footer nav")?.setAttribute("aria-label", copy.footerNavigation);
    const languageTrigger = actions.querySelector('[data-preference-trigger="language"]');
    const displayTrigger = actions.querySelector('[data-preference-trigger="display"]');
    const languageMenu = actions.querySelector('[data-preference-menu="language"]');
    const displayMenu = actions.querySelector('[data-preference-menu="display"]');
    languageTrigger?.setAttribute("aria-label", copy.controls.language);
    displayTrigger?.setAttribute("aria-label", copy.controls.displayMode);
    const languageLabel = languageTrigger?.querySelector('[data-preference-label="language"]');
    const displayLabel = displayTrigger?.querySelector('[data-preference-label="display"]');
    if (languageLabel) languageLabel.textContent = copy.controls.language;
    if (displayLabel) displayLabel.textContent = copy.controls.displayMode;
    languageMenu?.setAttribute("aria-label", copy.controls.language);
    displayMenu?.setAttribute("aria-label", copy.controls.displayMode);
    actions.querySelectorAll("[data-display-option]").forEach((option) => {
      const value = option.dataset.displayOption;
      const label = option.querySelector("[data-display-label]");
      if (label && copy.controls[value === "auto" ? "automatic" : value]) {
        label.textContent = copy.controls[value === "auto" ? "automatic" : value];
      }
    });
    applySettingsCopy(locale);
    applyStandardsCopy(locale);
    applyStyleCopy(locale);
    applyCatalogCopy(locale);
  }

  function applySettingsCopy(locale) {
    const copy = settingsCopy[locale] || settingsCopy.en;
    document.querySelectorAll("[data-settings-copy]").forEach((element) => {
      const value = copy[element.dataset.settingsCopy];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-settings-aria]").forEach((element) => {
      const value = copy[element.dataset.settingsAria];
      if (value) element.setAttribute("aria-label", value);
    });
    document.dispatchEvent(new CustomEvent("library-settings-locale", { detail: { locale, copy } }));
  }

  function applyStandardsCopy(locale) {
    const copy = standardsCopy[locale] || standardsCopy.en;
    document.querySelectorAll("[data-standards-copy]").forEach((element) => {
      const value = copy[element.dataset.standardsCopy];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-standards-aria]").forEach((element) => {
      const value = copy[element.dataset.standardsAria];
      if (value) element.setAttribute("aria-label", value);
    });
  }

  function applyStyleCopy(locale) {
    const copy = styleCopy[locale] || styleCopy.en;
    document.querySelectorAll("[data-style-copy]").forEach((element) => {
      const value = copy[element.dataset.styleCopy];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-style-aria]").forEach((element) => {
      const value = copy[element.dataset.styleAria];
      if (value) element.setAttribute("aria-label", value);
    });
  }

  function applyCatalogCopy(locale) {
    const copy = catalogCopy[locale] || catalogCopy.en;
    document.querySelectorAll("[data-catalog-copy]").forEach((element) => {
      const value = copy[element.dataset.catalogCopy];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-catalog-aria]").forEach((element) => {
      const value = copy[element.dataset.catalogAria];
      if (value) element.setAttribute("aria-label", value);
    });
  }

  function makeBetaPreferenceControls(actions) {
    const languageIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.75" stroke="currentColor" stroke-width="1.5"/><path d="M3.6 12h16.8M12 3.25c2.1 2.35 3.15 5.27 3.15 8.75S14.1 18.4 12 20.75C9.9 18.4 8.85 15.48 8.85 12S9.9 5.6 12 3.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    const displayIcon = '<span class="library-display-icon" aria-hidden="true"><svg data-mode-icon="auto" viewBox="0 0 24 24" fill="none"><rect x="3.25" y="4.25" width="17.5" height="13.5" rx="1.75" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 20h7M12 17.75V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><svg data-mode-icon="light" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 2.75v2M12 19.25v2M21.25 12h-2M4.75 12h-2M18.54 5.46l-1.42 1.42M6.88 17.12l-1.42 1.42M18.54 18.54l-1.42-1.42M6.88 6.88 5.46 5.46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><svg data-mode-icon="dark" viewBox="0 0 24 24" fill="none"><path d="M19.4 15.2A8.25 8.25 0 0 1 8.8 4.6 8.25 8.25 0 1 0 19.4 15.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>';
    const localeOptions = Object.entries(localeNames).map(([value, label]) => `<button aria-checked="false" data-locale-option="${value}" role="menuitemradio" type="button"><span>${label}</span><span aria-hidden="true" class="library-menu-popup-check"></span></button>`).join("");
    const modeOptions = displayModes.map((value) => `<button aria-checked="false" data-display-option="${value}" role="menuitemradio" type="button"><span data-display-label>${value}</span><span aria-hidden="true" class="library-menu-popup-check"></span></button>`).join("");
    actions.innerHTML = `<div class="library-menu-control"><button aria-expanded="false" aria-haspopup="menu" aria-label="Language" class="library-icon-button" data-preference-trigger="language" type="button">${languageIcon}<span class="library-preference-label" data-preference-label="language">Language</span></button><div aria-label="Language" class="library-menu-popup" data-preference-menu="language" hidden role="menu">${localeOptions}</div></div><div class="library-menu-control"><button aria-expanded="false" aria-haspopup="menu" aria-label="Display mode" class="library-icon-button" data-display-mode="auto" data-preference-trigger="display" type="button">${displayIcon}<span class="library-preference-label" data-preference-label="display">Display mode</span></button><div aria-label="Display mode" class="library-menu-popup" data-preference-menu="display" hidden role="menu">${modeOptions}</div></div>`;

    const localeValues = Object.keys(localeNames);
    let locale = readPreference("one-mind-beta.locale");
    if (!localeValues.includes(locale)) locale = "en";
    let displayMode = readPreference("one-mind-beta.display-mode");
    if (!displayModes.includes(displayMode)) {
      const legacyTheme = readPreference("onemind-ui-library-theme");
      displayMode = legacyTheme === "light" || legacyTheme === "dark" ? legacyTheme : "auto";
    }
    let openPopup = null;

    const triggers = {
      language: actions.querySelector('[data-preference-trigger="language"]'),
      display: actions.querySelector('[data-preference-trigger="display"]'),
    };
    const menus = {
      language: actions.querySelector('[data-preference-menu="language"]'),
      display: actions.querySelector('[data-preference-menu="display"]'),
    };

    function updateChecks() {
      actions.querySelectorAll("[data-locale-option]").forEach((option) => {
        const selected = option.dataset.localeOption === locale;
        option.setAttribute("aria-checked", String(selected));
        option.querySelector(".library-menu-popup-check").textContent = selected ? "✓" : "";
      });
      actions.querySelectorAll("[data-display-option]").forEach((option) => {
        const selected = option.dataset.displayOption === displayMode;
        option.setAttribute("aria-checked", String(selected));
        option.querySelector(".library-menu-popup-check").textContent = selected ? "✓" : "";
      });
      triggers.display.dataset.displayMode = displayMode;
    }

    function closePopup(restoreFocus) {
      const previous = openPopup;
      openPopup = null;
      Object.entries(menus).forEach(([key, menu]) => {
        menu.hidden = true;
        triggers[key].setAttribute("aria-expanded", "false");
      });
      if (restoreFocus && previous) window.requestAnimationFrame(() => triggers[previous].focus());
    }

    function togglePopup(name) {
      if (openPopup === name) {
        closePopup(false);
        return;
      }
      closePopup(false);
      openPopup = name;
      menus[name].hidden = false;
      triggers[name].setAttribute("aria-expanded", "true");
    }

    triggers.language.addEventListener("click", () => togglePopup("language"));
    triggers.display.addEventListener("click", () => togglePopup("display"));
    actions.querySelectorAll("[data-locale-option]").forEach((option) => option.addEventListener("click", () => {
      locale = option.dataset.localeOption;
      writePreference("one-mind-beta.locale", locale);
      updateChecks();
      applyHomeCopy(locale, actions);
      closePopup(true);
    }));
    actions.querySelectorAll("[data-display-option]").forEach((option) => option.addEventListener("click", () => {
      displayMode = option.dataset.displayOption;
      const theme = resolvedTheme(displayMode);
      writePreference("one-mind-beta.display-mode", displayMode);
      writePreference("onemind-ui-library-theme", theme);
      updateChecks();
      setTheme(theme);
      closePopup(true);
    }));
    document.addEventListener("pointerdown", (event) => {
      if (openPopup && !actions.contains(event.target)) closePopup(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && openPopup) closePopup(true);
    });
    window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
      if (displayMode === "auto") setTheme(resolvedTheme(displayMode));
    });

    updateChecks();
    applyHomeCopy(locale, actions);
    setTheme(resolvedTheme(displayMode));
    if (location.hash === "#library-home-sections") history.replaceState(null, "", location.pathname + location.search);
  }

  function makeShell() {
    const header = document.querySelector("body > header");
    if (!header) return;
    const actions = document.createElement("div");
    actions.className = "library-header-actions";
    header.append(actions);

    if (document.body.classList.contains("library-home")) {
      const year = document.querySelector("[data-library-year]");
      if (year) year.textContent = String(new Date().getFullYear());
      makeBetaPreferenceControls(actions);
      const workshop = document.body.matches(".library-standards-page,.library-settings-page");
      const primaryDrawer = document.querySelector(".library-primary-drawer");
      const brand = header.querySelector(".library-brand");
      if (workshop && primaryDrawer && brand) {
        document.body.classList.add("library-workshop-shell");
        const drawerBrand = document.createElement("div");
        drawerBrand.className = "library-workshop-drawer-brand";
        drawerBrand.append(brand);
        actions.classList.add("library-workshop-drawer-actions");
        primaryDrawer.prepend(drawerBrand);
        primaryDrawer.append(actions);
        header.remove();
      }
    } else {
      actions.innerHTML = '<button class="theme-toggle" type="button" aria-pressed="false">Dark preview</button>';
      const nav = document.createElement("nav");
      nav.className = "library-global-nav";
      nav.setAttribute("aria-label", "Library sections");
      nav.innerHTML = `<ul>${links.map(([href, label, key]) => `<li><a href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul>`;
      header.after(nav);
      const toggle = actions.querySelector("button");
      const saved = readPreference("onemind-ui-library-theme");
      const initial = saved === "dark" || saved === "light" ? saved : resolvedTheme("auto");
      setTheme(initial, toggle);
      toggle.addEventListener("click", () => {
        const next = document.documentElement.dataset.libraryTheme === "dark" ? "light" : "dark";
        setTheme(next, toggle);
        writePreference("onemind-ui-library-theme", next);
      });
    }
  }

  function renderDotSea() {
    const canvas = document.querySelector(".library-dot-sea");
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const columns = 35;
    const rows = 28;
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { active: false, x: 0, y: 0 };
    let animationFrame = null;
    let width = 1;
    let height = 1;
    let pixelRatio = 1;

    function palette() {
      const styles = getComputedStyle(document.documentElement);
      return [
        "--one-mind-tool-openai",
        "--one-mind-tool-claude",
        "--one-mind-tool-antigravity",
        "--one-mind-tool-openclaw",
        "--one-mind-tool-codebuddy",
        "--one-mind-tool-qoder",
        "--one-mind-tool-trae",
        "--one-mind-tool-neutral",
      ].map((token) => styles.getPropertyValue(token).trim());
    }

    function draw(timestamp) {
      const colors = palette();
      context.clearRect(0, 0, width, height);
      const stepX = width / Math.max(columns - 1, 1);
      const stepY = height / Math.max(rows - 1, 1);
      const base = Math.max(2.8, Math.min(4.8, Math.sqrt(width * height) * .00425));
      const cycle = reducedMotion ? 0 : timestamp * .00125;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * stepX;
          const y = row * stepY;
          const wave = (Math.sin(column * .36 + cycle) + Math.cos(row * .43 - cycle * .74) + 2) / 4;
          const distance = pointer.active ? Math.hypot(x - pointer.x, y - pointer.y) : Number.POSITIVE_INFINITY;
          const influence = Math.max(0, 1 - distance / Math.max(180, Math.min(width, height) * .27));
          const size = base * (.72 + wave * .82 + influence * 1.7);
          const colorPosition = (column / columns * .7 + row / rows * .24 + cycle * .018) % 1;
          const colorIndex = Math.floor(colorPosition * colors.length) % colors.length;
          context.globalAlpha = .18 + wave * .24 + influence * .42;
          context.fillStyle = colors[colorIndex];
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      context.globalAlpha = 1;
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reducedMotion) draw(0);
    }

    function updatePointer(event) {
      const bounds = canvas.getBoundingClientRect();
      pointer.active = event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }

    function redraw() {
      if (reducedMotion) draw(0);
    }

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", () => { pointer.active = false; }, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.libraryDotSea = { redraw };
    resize();
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);

    window.addEventListener("pagehide", () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    }, { once: true });
  }

  function createSettingsPreview() {
    const preview = document.createElement("div");
    preview.className = "library-settings-preview element-settings-preview";
    preview.setAttribute("aria-hidden", "true");
    preview.inert = true;
    preview.innerHTML = `
      <div class="library-settings-preview-heading">
        <div><p data-settings-copy="livePreview">Live preview</p><h4 data-settings-copy="previewTitle">Shared interface</h4></div>
      </div>
      <div class="library-settings-grid-preview">${"<span></span>".repeat(12)}</div>
      <div class="library-settings-preview-card">
        <span class="library-settings-preview-icon">Aa</span>
        <h4 data-settings-copy="previewCardTitle">One calm foundation</h4>
        <p data-settings-copy="previewCardDescription">Color, type, geometry, and motion stay coherent across every shared surface.</p>
        <div class="library-settings-preview-actions">
          <span data-settings-copy="primaryAction">Primary action</span>
          <span class="secondary" data-settings-copy="secondaryAction">Secondary</span>
        </div>
      </div>`;
    return preview;
  }

  function structureSettingsGroup(group) {
    if (group.querySelector(":scope > .element-content-parts")) return;
    const introduction = group.querySelector(":scope > div");
    const title = introduction?.querySelector(":scope > h2");
    const description = introduction?.querySelector(":scope > p");
    if (!title || !description) return;

    const adjustments = document.createElement("div");
    adjustments.className = "element-adjustments-content";
    Array.from(group.children).filter((child) => child !== introduction).forEach((child) => adjustments.append(child));

    const parts = document.createElement("div");
    parts.className = "element-content-parts";
    const section = (name, copyKey, content) => {
      const region = document.createElement("section");
      region.className = `element-content-section element-${name}`;
      const heading = document.createElement("h3");
      heading.className = "element-content-heading";
      heading.id = `${group.id}-${name}-heading`;
      heading.dataset.settingsCopy = copyKey;
      heading.textContent = settingsCopy.en[copyKey];
      region.setAttribute("aria-labelledby", heading.id);
      region.append(heading, content);
      return region;
    };

    parts.append(
      section("description", "sectionDescription", description),
      section("adjustments", "sectionAdjustments", adjustments),
      section("preview", "sectionPreview", createSettingsPreview()),
    );
    group.replaceChildren(title, parts);
  }

  function ensureWorkshopActionBar() {
    const root = document.querySelector("body:is(.library-standards-page,.library-settings-page)");
    if (!root) return null;
    const content = root.querySelector(".library-settings-content,.library-standards-content");
    if (!content) return null;
    let bar = content.querySelector(":scope > .library-settings-action-bar");
    if (!bar) {
      bar = document.createElement("header");
      bar.className = "library-settings-action-bar";
      bar.innerHTML = '<div class="library-settings-actions"><button class="library-settings-reset" id="settings-reset" type="button" data-settings-copy="reset">Reset</button><button class="library-settings-undo" disabled id="settings-undo" type="button" data-settings-copy="undo">Undo</button><button class="library-settings-save" disabled id="settings-save" type="button" data-settings-copy="save">Save</button></div><p aria-live="polite" class="visually-hidden" id="settings-save-status"></p>';
      content.prepend(bar);
    } else if (!bar.querySelector("#settings-undo")) {
      const undo = document.createElement("button");
      undo.className = "library-settings-undo";
      undo.disabled = true;
      undo.id = "settings-undo";
      undo.type = "button";
      undo.dataset.settingsCopy = "undo";
      undo.textContent = "Undo";
      bar.querySelector("#settings-save")?.before(undo);
    }
    const locale = readPreference("one-mind-beta.locale") || "en";
    const copy = settingsCopy[locale] || settingsCopy.en;
    bar.setAttribute("aria-label", copy.title);
    applySettingsCopy(locale);
    return bar;
  }

  function initSharedWorkshopActions() {
    const root = document.querySelector("body:is(.library-standards-page,.library-settings-page)");
    if (!root || root.classList.contains("library-settings-page")) return;
    const bar = ensureWorkshopActionBar();
    if (!bar) return;
    let state = loadSettings();
    const history = [];
    let savedSnapshot = JSON.stringify(normalizeSettings(state));
    const controls = {
      reset: bar.querySelector("#settings-reset"),
      undo: bar.querySelector("#settings-undo"),
      save: bar.querySelector("#settings-save"),
      status: bar.querySelector("#settings-save-status"),
    };

    function render() {
      state = applySettings(state);
      controls.undo.disabled = history.length === 0;
      controls.save.disabled = JSON.stringify(state) === savedSnapshot;
    }

    function update(next) {
      const normalized = normalizeSettings(next);
      if (JSON.stringify(normalized) === JSON.stringify(state)) return;
      history.push(normalizeSettings(state));
      state = normalized;
      controls.status.textContent = "";
      render();
    }

    controls.reset.addEventListener("click", () => update(settingsDefaults));
    controls.undo.addEventListener("click", () => {
      const previous = history.pop();
      if (!previous) return;
      state = previous;
      controls.status.textContent = "";
      render();
    });
    controls.save.addEventListener("click", () => {
      const locale = readPreference("one-mind-beta.locale") || "en";
      const copy = settingsCopy[locale] || settingsCopy.en;
      if (writePreference(settingsStorageKey, JSON.stringify(state))) {
        savedSnapshot = JSON.stringify(state);
        controls.status.textContent = copy.saved;
      } else {
        controls.status.textContent = copy.saveFailed;
      }
      render();
    });
    document.addEventListener("library-settings-locale", (event) => {
      bar.setAttribute("aria-label", event.detail.copy.title);
      controls.status.textContent = "";
    });
    document.addEventListener("library-settings-theme", render);
    render();
  }

  function initSettingsWorkspace() {
    const root = document.querySelector(".library-settings-page");
    if (!root) return;
    let state = loadSettings();
    const railLinks = Array.from(root.querySelectorAll(".library-settings-rail nav a"));
    const settingsGroups = Array.from(root.querySelectorAll(".library-settings-group"));
    settingsGroups.forEach(structureSettingsGroup);
    applySettingsCopy(readPreference("one-mind-beta.locale") || "en");

    function showSettingsGroup(hash) {
      const currentHash = settingsGroups.some((group) => `#${group.id}` === hash) ? hash : railLinks[0]?.hash;
      railLinks.forEach((link) => {
        if (link.hash === currentHash) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      settingsGroups.forEach((group) => { group.hidden = `#${group.id}` !== currentHash; });
    }

    railLinks.forEach((link) => link.addEventListener("click", () => {
      showSettingsGroup(link.hash);
    }));
    window.addEventListener("hashchange", () => showSettingsGroup(location.hash));
    showSettingsGroup(location.hash);

    const controls = {
      color: Array.from(document.querySelectorAll('input[name="color"]')),
      colorRoles: Array.from(document.querySelectorAll("[data-color-role]")),
      grid: document.querySelector("#settings-grid"),
      size: document.querySelector("#settings-size"),
      font: document.querySelector("#settings-font"),
      spacing: document.querySelector("#settings-spacing"),
      radius: document.querySelector("#settings-radius"),
      elevation: document.querySelector("#settings-elevation"),
      motion: document.querySelector("#settings-motion"),
      reset: document.querySelector("#settings-reset"),
      undo: document.querySelector("#settings-undo"),
      save: document.querySelector("#settings-save"),
      status: document.querySelector("#settings-save-status"),
    };
    const history = [];
    let savedSnapshot = JSON.stringify(normalizeSettings(state));

    function currentCopy() {
      const locale = readPreference("one-mind-beta.locale") || "en";
      return settingsCopy[locale] || settingsCopy.en;
    }

    function render() {
      state = applySettings(state);
      controls.color.forEach((control) => { control.checked = control.value === state.color; });
      controls.colorRoles.forEach((input) => {
        const role = input.dataset.colorRole;
        if (document.activeElement !== input) input.value = state.colors[role];
        const swatch = document.querySelector(`[data-color-swatch="${role}"]`);
        if (swatch) swatch.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(settingsColorTokens[role]).trim();
      });
      ["grid", "size", "spacing", "radius", "elevation"].forEach((key) => { controls[key].value = state[key]; });
      controls.font.value = state.font;
      controls.motion.value = state.motion;

      document.querySelector("#settings-grid-output").value = String(state.grid);
      document.querySelector("#settings-size-output").value = `${state.size} px`;
      document.querySelector("#settings-spacing-output").value = `${state.spacing} px`;
      document.querySelector("#settings-radius-output").value = `${state.radius} px`;
      document.querySelector("#settings-elevation-output").value = String(state.elevation);
      controls.undo.disabled = history.length === 0;
      controls.save.disabled = JSON.stringify(state) === savedSnapshot;
    }

    function renderDraft() {
      controls.status.textContent = "";
      render();
    }

    function update(mutator) {
      const next = normalizeSettings(state);
      mutator(next);
      const normalized = normalizeSettings(next);
      if (JSON.stringify(normalized) === JSON.stringify(state)) return;
      history.push(normalizeSettings(state));
      state = normalized;
      renderDraft();
    }

    controls.color.forEach((control) => control.addEventListener("change", () => update((next) => { next.color = control.value; })));
    controls.colorRoles.forEach((input) => {
      const error = document.querySelector("#settings-color-error");
      input.setAttribute("aria-describedby", "settings-color-help settings-color-error");
      const validate = () => {
        const value = input.value.trim();
        const valid = isSupportedColor(value);
        input.setAttribute("aria-invalid", String(!valid));
        if (error) error.hidden = valid;
        if (valid) {
          update((next) => { next.colors[input.dataset.colorRole] = value; });
        }
        return valid;
      };
      input.addEventListener("input", validate);
      input.addEventListener("blur", () => {
        if (!validate()) input.value = state.colors[input.dataset.colorRole];
        input.removeAttribute("aria-invalid");
        if (error) error.hidden = true;
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") input.blur();
        if (event.key === "Escape") {
          input.value = state.colors[input.dataset.colorRole];
          input.blur();
        }
      });
    });
    ["grid", "size", "spacing", "radius", "elevation"].forEach((key) => controls[key].addEventListener("input", () => update((next) => { next[key] = Number(controls[key].value); })));
    controls.font.addEventListener("change", () => update((next) => { next.font = controls.font.value; }));
    controls.motion.addEventListener("change", () => update((next) => { next.motion = controls.motion.value; }));
    controls.reset.addEventListener("click", () => update((next) => Object.assign(next, normalizeSettings(settingsDefaults))));
    controls.undo.addEventListener("click", () => {
      const previous = history.pop();
      if (!previous) return;
      state = previous;
      renderDraft();
    });
    controls.save.addEventListener("click", () => {
      const copy = currentCopy();
      if (writePreference(settingsStorageKey, JSON.stringify(state))) {
        savedSnapshot = JSON.stringify(state);
        controls.status.textContent = copy.saved;
        render();
      } else {
        controls.status.textContent = copy.saveFailed;
      }
    });
    document.addEventListener("library-settings-locale", () => { controls.status.textContent = ""; render(); });
    document.addEventListener("library-settings-theme", render);
    render();
  }

  function specimenFor(entry) {
    const id = entry.id;
    if (entry.querySelector(".module-preview")) return;
    const preview = document.createElement("div");
    preview.className = "module-preview";
    preview.setAttribute("aria-hidden", "true");
    preview.inert = true;
    const isPageEntry = Boolean(entry.closest("[data-library-level='page-module'],[data-library-level='page-pattern']"));

    if (isPageEntry) {
      preview.classList.add("page-preview");
      preview.innerHTML = '<div class="page-specimen"><aside><span></span><span></span><span></span></aside><section><header></header><div class="page-specimen-content"><span></span><span></span><span></span></div></section></div>';
    } else if (id === "side-drawer") {
      preview.classList.add("side-drawer-preview");
      preview.innerHTML = '<div class="side-drawer-specimen"><aside><div class="side-drawer-specimen-brand"><span></span><strong>OneMind</strong></div><nav><span aria-current="page"><i></i>Home</span><span><i></i>Mind</span><span><i></i>Team</span><span><i></i>Settings</span></nav><div class="side-drawer-specimen-profile"><i></i><span><strong>Account</strong><small>Workspace</small></span></div></aside><section><header><span></span><span></span></header><div><strong>Main view</strong><span></span><span></span><span></span></div></section></div>';
    } else if (id === "side-drawer-toggle") {
      preview.innerHTML = '<div class="drawer-toggle-specimen"><span class="drawer-toggle-panel"><i></i><i></i><i></i></span><span class="drawer-toggle-control" aria-hidden="true">‹</span><span class="drawer-toggle-main"><i></i><i></i><i></i></span></div>';
    } else if (/color/.test(id)) {
      preview.innerHTML = '<div class="swatch-grid"><span data-swatch="background">Background</span><span data-swatch="surface">Surface</span><span data-swatch="selected">Selected</span><span data-swatch="text">Text</span><span data-swatch="accent">Accent</span><span data-swatch="danger">Danger</span></div>';
    } else if (/shadow|elevation/.test(id)) {
      preview.innerHTML = '<div class="elevation-grid"><span class="elevation-0">Level 0</span><span class="elevation-1">Level 1</span><span class="elevation-2">Level 2</span><span class="elevation-3">Level 3</span></div>';
    } else if (/layer|z-index/.test(id)) {
      preview.innerHTML = '<div class="layer-stack"><span>Content · 0</span><span>Navigation · 20</span><span>Overlay · 40</span><span>Dialog · 60</span><span>Toast · 80</span></div>';
    } else if (/layout|spacing|density/.test(id)) {
      preview.innerHTML = '<div class="layout-specimen"><span>Rail</span><span>Main content</span><span>Inspector</span></div>';
    } else if (/list|inbox|inventory|row/.test(id)) {
      preview.innerHTML = '<div class="list-specimen"><div><strong>List title</strong><button type="button">Action</button></div><span>List item</span><span aria-current="true">Selected item</span><span>List item</span><button type="button" class="secondary">Load more</button></div>';
    } else if (/button|action/.test(id)) {
      preview.innerHTML = '<div class="preview-actions"><button type="button">Action</button><button type="button" class="secondary">Secondary</button><button type="button" disabled>Disabled</button></div>';
    } else if (/form|edit|composer|checkout|sign-in/.test(id)) {
      preview.innerHTML = '<div class="form-specimen"><label>Field label<input value="Neutral value" readonly></label><div class="preview-actions"><button type="button">Save</button><button type="button" class="secondary">Cancel</button></div></div>';
    } else if (/dialog|panel|drawer|receipt|report/.test(id)) {
      preview.innerHTML = '<div class="panel-specimen"><div><strong>Panel title</strong><button type="button" aria-label="Close preview">×</button></div><p>Supporting content and state details.</p><div class="preview-actions"><button type="button">Confirm</button><button type="button" class="secondary">Cancel</button></div></div>';
    } else if (/menu|navigation|footer|title-bar/.test(id)) {
      preview.innerHTML = '<div class="navigation-specimen"><strong>Brand</strong><a href="#">Destination</a><a href="#">Destination</a><button type="button">Action</button></div>';
    } else {
      preview.innerHTML = '<div class="generic-specimen"><span></span><span></span><span></span></div>';
    }
    entry.insertBefore(preview, entry.querySelector("dl"));
  }

  function structureComponentEntry(entry) {
    if (!entry.closest("[data-library-level='component']") || entry.querySelector(":scope > .component-content-parts")) return;
    const description = entry.querySelector(":scope > p");
    const adjustments = entry.querySelector(":scope > dl");
    const preview = entry.querySelector(":scope > .module-preview");
    if (!description || !preview) return;

    const parts = document.createElement("div");
    parts.className = "component-content-parts";
    const section = (name, copyKey, content) => {
      const region = document.createElement("section");
      region.className = `component-content-section component-${name}`;
      const heading = document.createElement("h3");
      heading.className = "component-content-heading";
      heading.id = `${entry.id}-${name}-heading`;
      heading.dataset.catalogCopy = copyKey;
      heading.textContent = catalogCopy.en[copyKey];
      region.setAttribute("aria-labelledby", heading.id);
      region.append(heading, content);
      return region;
    };

    let adjustmentContent = adjustments;
    if (!adjustmentContent) {
      adjustmentContent = document.createElement("p");
      adjustmentContent.className = "component-no-adjustments";
      adjustmentContent.dataset.catalogCopy = "componentNoAdjustments";
      adjustmentContent.textContent = catalogCopy.en.componentNoAdjustments;
    }
    parts.append(
      section("description", "componentSectionDescription", description),
      section("adjustments", "componentSectionAdjustments", adjustmentContent),
      section("preview", "componentSectionPreview", preview),
    );
    entry.append(parts);
  }

  function enhanceEntries() {
    document.querySelectorAll(".library-entry[id]").forEach((entry) => {
      if (entry.closest(".library-standards-page")) return;
      specimenFor(entry);
      entry.classList.add("is-collapsible");
      const heading = entry.querySelector("h2,h3");
      if (!heading || heading.querySelector("button")) return;
      const label = heading.textContent;
      const standardsCopyKey = heading.dataset.standardsCopy;
      const details = Array.from(entry.children).filter((node) => node !== heading);
      const detailId = `${entry.id}-details`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "entry-toggle";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", detailId);
      button.innerHTML = `<span${standardsCopyKey ? ` data-standards-copy="${standardsCopyKey}"` : ""}>${label}</span><span aria-hidden="true">＋</span>`;
      heading.textContent = "";
      heading.append(button);
      const wrapper = document.createElement("div");
      wrapper.className = "entry-details";
      wrapper.id = detailId;
      wrapper.hidden = true;
      details.forEach((node) => wrapper.append(node));
      entry.append(wrapper);
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.lastElementChild.textContent = expanded ? "＋" : "−";
        wrapper.hidden = expanded;
      });
    });
  }

  function initStandardsDrawer() {
    const root = document.querySelector('body:is([data-library-page="guide"],[data-library-page="style"]).library-standards-page');
    if (!root) return;
    const links = Array.from(root.querySelectorAll(".library-standards-drawer nav a"));
    const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);

    function setCurrent(id) {
      links.forEach((link) => {
        if (link.hash === `#${id}`) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    function showSection(section) {
      sections.forEach((candidate) => { candidate.hidden = candidate !== section; });
      setCurrent(section.id);
    }

    links.forEach((link) => link.addEventListener("click", () => {
      const section = document.querySelector(link.hash);
      if (!section) return;
      showSection(section);
    }));

    const initial = (location.hash ? document.querySelector(location.hash) : null) || sections[0];
    if (initial) showSection(initial);

    window.addEventListener("hashchange", () => {
      const section = location.hash ? document.querySelector(location.hash) : sections[0];
      if (!section) return;
      showSection(section);
    });
  }

  function initCatalogDrawer() {
    const root = document.querySelector(".library-catalog-page");
    if (!root) return;
    const drawer = root.querySelector(".library-catalog-drawer");
    const drawerNav = drawer?.querySelector("nav");
    const groupLinks = Array.from(drawerNav?.querySelectorAll("a[data-catalog-group]") || []);
    const catalogPage = root.dataset.libraryPage;
    const componentGroups = {
      navigation: ["title-action-list", "public-menu-bar", "side-drawer", "side-drawer-toggle", "contextual-side-navigation", "main-view-boundary", "side-floating-panel", "mode-title-bar", "preference-radio-menu"],
      data: ["identity-navigation-list", "notification-inbox", "notification-detail-drawer", "notification-family-icon", "file-inventory", "conflict-report", "authoritative-receipt-detail", "async-state-boundary"],
      forms: ["settings-row", "filter-radio-menu", "profile-edit-panel", "markdown-file-editor", "confirmation-dialog", "pricing-card-grid", "sign-in-process-banner"],
      public: ["landing-scene", "horizontal-story", "tool-logo-cloud", "site-footer", "host-utility-action", "software-update-availability-action"],
    };

    if (catalogPage === "components") {
      Object.entries(componentGroups).forEach(([group, ids]) => ids.forEach((id) => {
        const entry = document.getElementById(id);
        if (entry) entry.dataset.catalogGroup = group;
      }));
    }

    const items = catalogPage === "components"
      ? Array.from(root.querySelectorAll(".library-catalog-list .library-entry[data-catalog-group]"))
      : Array.from(root.querySelectorAll(".library-catalog-list > [data-catalog-group]"));

    if (catalogPage === "components") items.forEach((entry) => {
      specimenFor(entry);
      structureComponentEntry(entry);
    });
    else items.forEach((section) => section.querySelectorAll(".library-entry").forEach(specimenFor));
    applyCatalogCopy(readPreference("one-mind-beta.locale") || "en");

    const entriesByGroup = Object.fromEntries(groupLinks.map((link) => {
      const group = link.dataset.catalogGroup;
      const entries = catalogPage === "components"
        ? items.filter((item) => item.dataset.catalogGroup === group)
        : Array.from(items.find((item) => item.dataset.catalogGroup === group)?.querySelectorAll(".library-entry") || []);
      return [group, entries];
    }));

    const disclosures = groupLinks.map((groupLink) => {
      const group = groupLink.dataset.catalogGroup;
      const details = document.createElement("details");
      details.className = "library-catalog-disclosure";
      details.dataset.catalogGroup = group;
      details.open = true;

      const summary = document.createElement("summary");
      const folder = document.createElement("span");
      folder.className = "library-catalog-disclosure-folder";
      folder.setAttribute("aria-hidden", "true");
      folder.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M3.75 6.75h6l1.8 2h8.7v9.5H3.75v-11.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.75 9.25h16.5l-1.7 9H2.5l1.25-9Z" fill="var(--one-mind-page-background)" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
      const label = document.createElement("span");
      label.textContent = groupLink.textContent;
      if (groupLink.dataset.catalogCopy) label.dataset.catalogCopy = groupLink.dataset.catalogCopy;
      summary.append(folder, label);

      const list = document.createElement("div");
      list.className = "library-catalog-disclosure-items";
      entriesByGroup[group].forEach((entry) => {
        const link = document.createElement("a");
        link.href = `#${entry.id}`;
        link.dataset.catalogGroup = group;
        link.textContent = entry.querySelector("h2,h3")?.textContent || entry.id;
        list.append(link);
      });
      details.append(summary, list);
      return details;
    });

    if (drawerNav) drawerNav.replaceChildren(...disclosures);

    const itemLinks = Array.from(drawerNav?.querySelectorAll(".library-catalog-disclosure-items a") || []);
    function selectGroup(group, targetId) {
      const selectedDisclosure = disclosures.find((node) => node.dataset.catalogGroup === group) || disclosures[0];
      if (!selectedDisclosure) return;
      const resolvedGroup = selectedDisclosure.dataset.catalogGroup;
      const selectedEntry = entriesByGroup[resolvedGroup]?.find((entry) => entry.id === targetId) || entriesByGroup[resolvedGroup]?.[0];
      if (!selectedEntry) return;
      selectedDisclosure.open = true;
      disclosures.forEach((node) => {
        node.classList.toggle("is-current", node === selectedDisclosure);
      });
      if (catalogPage === "components") {
        items.forEach((item) => { item.hidden = item !== selectedEntry; });
      } else {
        items.forEach((section) => {
          section.hidden = section.dataset.catalogGroup !== resolvedGroup;
          const sectionHeading = section.querySelector(":scope > h2");
          if (sectionHeading) sectionHeading.hidden = true;
          section.querySelectorAll(".library-entry").forEach((entry) => { entry.hidden = entry !== selectedEntry; });
        });
      }
      itemLinks.forEach((link) => {
        if (link.hash === `#${selectedEntry.id}`) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
      const currentLink = itemLinks.find((link) => link.hash === `#${selectedEntry.id}`);
      if (currentLink && drawerNav) requestAnimationFrame(() => {
        const navRect = drawerNav.getBoundingClientRect();
        const linkRect = currentLink.getBoundingClientRect();
        if (linkRect.bottom > navRect.bottom - 8) drawerNav.scrollTop += linkRect.bottom - navRect.bottom + 8;
        else if (linkRect.top < navRect.top + 8) drawerNav.scrollTop -= navRect.top - linkRect.top + 8;
      });
    }

    function selectionFromHash() {
      const target = location.hash ? document.querySelector(location.hash) : null;
      const targetGroup = target?.dataset.catalogGroup || target?.closest("[data-catalog-group]")?.dataset.catalogGroup;
      if (targetGroup) return { group: targetGroup, targetId: target?.classList.contains("library-entry") ? target.id : null };
      const matchingLink = groupLinks.find((link) => link.hash === location.hash);
      return { group: matchingLink?.dataset.catalogGroup || groupLinks[0]?.dataset.catalogGroup, targetId: null };
    }

    disclosures.forEach((details, index) => {
      const summary = details.querySelector("summary");
      summary.addEventListener("click", (event) => {
        event.preventDefault();
        details.open = !details.open;
      });
      summary.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        summary.click();
      });
    });
    itemLinks.forEach((link) => link.addEventListener("click", () => selectGroup(link.dataset.catalogGroup, link.hash.slice(1))));
    const initial = selectionFromHash();
    selectGroup(initial.group, initial.targetId);
    window.addEventListener("hashchange", () => {
      const selection = selectionFromHash();
      selectGroup(selection.group, selection.targetId);
    });
  }

  applySettings(loadSettings());
  renderDotSea();
  makeShell();
  ensureWorkshopActionBar();
  initSettingsWorkspace();
  initSharedWorkshopActions();
  enhanceEntries();
  initStandardsDrawer();
  initCatalogDrawer();
})();

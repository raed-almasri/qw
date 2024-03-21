import { Features, Users } from "../models/index.js";
import { enumRoles } from "./enums.js";
let features = [
	{
		name: {
			ar: "مسبح",
			en: "Swimming Pool",
			tr: "Yüzme Havuzu",
		},
		description: {
			ar: "مسبح رائع للاستمتاع بالسباحة",
			en: "Fantastic swimming pool for enjoyment",
			tr: "Harika bir yüzme havuzu keyif için",
		},
	},
	{
		name: {
			ar: "اطلالة على الطبيعة",
			en: "Nature View",
			tr: "Doğa Manzarası",
		},
		description: {
			ar: "اطلالة خلابة على الطبيعة",
			en: "Breathtaking views of nature",
			tr: "Ateşli doğa manzaraları",
		},
	},
	{
		name: {
			ar: "إطلالة على المدينة",
			en: "City View",
			tr: "Şehir Manzarası",
		},
		description: {
			ar: "إطلالة جميلة على المدينة",
			en: "Beautiful city views",
			tr: "Güzel şehir manzaraları",
		},
	},
	{
		name: {
			ar: "قرب من الشواطئ",
			en: "Close to Beaches",
			tr: "Tellere Yakın",
		},
		description: {
			ar: "موقع ممتاز قريب من الشواطئ",
			en: "Excellent location near beaches",
			tr: "Tellere yakın harika bir konum",
		},
	},
	{
		name: {
			ar: "حديقة خاصة",
			en: "Private Garden",
			tr: "Özel Bahçe",
		},
		description: {
			ar: "حديقة خاصة جميلة",
			en: "Beautiful private garden",
			tr: "Güzel özel bir bahçe",
		},
	},
	{
		name: {
			ar: "مواقف سيارات",
			en: "Car Parking",
			tr: "Araba Park Yeri",
		},
		description: {
			ar: "مواقف سيارات مريحة",
			en: "Convenient car parking",
			tr: "Rahatlıkla araba park yeri",
		},
	},
	{
		name: {
			ar: "مفروشة بالكامل",
			en: "Fully Furnished",
			tr: "Tamamen Mobilya",
		},
		description: {
			ar: "تأتي بأثاث كامل وعصري",
			en: "Comes fully furnished with modern furniture",
			tr: "Modern möbilya ile tamamen dolu gelir",
		},
	},
	{
		name: {
			ar: "نظام أمان متطور",
			en: "Advanced Security System",
			tr: "Gelişmiş Güvenlik Sistemi",
		},
		description: {
			ar: "نظام أمان عالي التقنية",
			en: "High-tech security system",
			tr: "Yüksek teknoloji güvenlik sistemi",
		},
	},
	{
		name: {
			ar: "مركز لياقة بدنية",
			en: "Fitness Center",
			tr: "Fitness Merkezi",
		},
		description: {
			ar: "صالة لياقة حديثة ومجهزة",
			en: "Modern and well-equipped fitness center",
			tr: "Modern ve iyi donatılmış bir fitness merkezi",
		},
	},
	{
		name: {
			ar: "مطبخ مجهز بالكامل",
			en: "Fully Equipped Kitchen",
			tr: "Tamamen Donatılmış Mutfak",
		},
		description: {
			ar: "مطبخ متكامل بالأجهزة الحديثة",
			en: "Kitchen complete with modern appliances",
			tr: "Modern uygulamalarla tam bir mutfak",
		},
	},
	{
		name: {
			ar: "شرفة كبيرة",
			en: "Large Balcony",
			tr: "Büyük Balkon",
		},
		description: {
			ar: "شرفة واسعة للاستمتاع بالهواء الطلق",
			en: "Spacious balcony for outdoor enjoyment",
			tr: "Dışarıda keyif almak için geniş bir balkon",
		},
	},
	{
		name: {
			ar: "تكييف هواء",
			en: "Air Conditioning",
			tr: "Havalandırma",
		},
		description: {
			ar: "أنظمة تكييف هواء عالية الجودة",
			en: "High-quality air conditioning systems",
			tr: "Yüksek kaliteli havalandırma sistemleri",
		},
	},
	{
		name: {
			ar: "قرب من مسارات للدراجات",
			en: "Near Bike Trails",
			tr: "Bisiklet Yolları Yakın",
		},
		description: {
			ar: "توفر مسارات للدراجات القريبة",
			en: "Close proximity to bike trails",
			tr: "Bisiklet yolları yakın",
		},
	},
	{
		name: {
			ar: "قرب من المدارس",
			en: "Near Schools",
			tr: "Okullar Yakın",
		},
		description: {
			ar: "موقع مريح قرب المدارس",
			en: "Convenient location near schools",
			tr: "Okullar yakın rahatlıkla konum",
		},
	},
	{
		name: {
			ar: "قرب من المستشفيات",
			en: "Near Hospitals",
			tr: "Tıpanevi Yakın",
		},
		description: {
			ar: "تواجد قريب من المستشفيات",
			en: "Close proximity to hospitals",
			tr: "Tıpanevi yakın",
		},
	},
	{
		name: {
			ar: "قرب من المراكز التجارية",
			en: "Close to Shopping Centers",
			tr: "Alışveriş Merkezleri Yakın",
		},
		description: {
			ar: "موقع متميز قرب المراكز التجارية",
			en: "Prime location near shopping centers",
			tr: "Alışveriş merkezleri yakın harika bir konum",
		},
	},
	{
		name: {
			ar: "قرب من المطاعم",
			en: "Close to Restaurants",
			tr: "Restoranlar Yakın",
		},
		description: {
			ar: "منطقة تضم مجموعة متنوعة من المطاعم",
			en: "Area with a variety of restaurants",
			tr: "Çeşitli restoranları olan bir bölge",
		},
	},
	{
		name: {
			ar: "قرب من وسائل النقل العامة",
			en: "Near Public Transportation",
			tr: "Halka Açık Ulaşım Yakın",
		},
		description: {
			ar: "سهولة الوصول لوسائل النقل العامة",
			en: "Easy access to public transportation",
			tr: "Halka açık ulaşım için kolay erişim",
		},
	},

	{
		name: {
			ar: "تكنولوجيا المنزل الذكي",
			en: "Smart Home Technology",
			tr: "Akıllı Ev Teknolojisi",
		},
		description: {
			ar: "أنظمة تكنولوجيا متقدمة للمنزل",
			en: "Advanced technology systems for the home",
			tr: "Ev için ileri teknoloji sistemleri",
		},
	},
	{
		name: {
			ar: "منطقة هادئة",
			en: "Quiet Area",
			tr: "Sessiz Alan",
		},
		description: {
			ar: "مكان هادئ ومنعزل",
			en: "Peaceful and secluded location",
			tr: "Sessiz ve yalıtılmış bir konum",
		},
	},
	{
		name: {
			ar: "قرب من المرافق الرياضية",
			en: "Near Sports Facilities",
			tr: "Spor Tesisleri Yakın",
		},
		description: {
			ar: "وجود مرافق رياضية قريبة",
			en: "Presence of nearby sports facilities",
			tr: "Yakın spor tesisleri",
		},
	},
	{
		name: {
			ar: "قرب من الأماكن الثقافية",
			en: "Near Cultural Places",
			tr: "Kültürel Yerler Yakın",
		},
		description: {
			ar: "قرب من الأماكن ذات الطابع الثقافي",
			en: "Proximity to culturally rich places",
			tr: "Kültürel zengin yerler yakın",
		},
	},
	{
		name: {
			ar: "إطلالة على المدينة الرئيسية",
			en: "Panoramic City View",
			tr: "Panoramik Şehir Manzarası",
		},
		description: {
			ar: "إطلالة شاملة على المدينة",
			en: "Comprehensive view of the city",
			tr: "Şehirin kapsamlı manzarası",
		},
	},
	{
		name: {
			ar: "نظام تهوية مركزي",
			en: "Central Ventilation System",
			tr: "Merkezi Havalandırma Sistemi",
		},
		description: {
			ar: "نظام تهوية مركزي عالي الجودة",
			en: "High-quality central ventilation system",
			tr: "Yüksek kaliteli merkezi havalandırma sistemi",
		},
	},
	{
		name: {
			ar: "تصميم حديث",
			en: "Modern Design",
			tr: "Modern Tasarım",
		},
		description: {
			ar: "تصميم عصري وأنيق",
			en: "Contemporary and elegant design",
			tr: "Güncel ve hoş bir tasarım",
		},
	},
	{
		name: {
			ar: "قرب من وسائل الراحة العامة",
			en: "Near Public Amenities",
			tr: "Halka Açık İhtiyaçlar Yakın",
		},
		description: {
			ar: "قرب من مرافق وخدمات الراحة العامة",
			en: "Close proximity to public comfort facilities",
			tr: "Halka açık rahatlık tesisleri yakın",
		},
	},
	{
		name: {
			ar: "إطلالة على المياه",
			en: "Water View",
			tr: "Su Manzarası",
		},
		description: {
			ar: "إطلالة خلّابة على المياه",
			en: "Stunning view of the water",
			tr: "Ateşli su manzarası",
		},
	},
	{
		name: {
			ar: "قرب من التقاطعات الرئيسية",
			en: "Close to Major Intersections",
			tr: "Büyük Kavşaklar Yakın",
		},
		description: {
			ar: "سهولة الوصول للتقاطعات الرئيسية",
			en: "Easy access to major intersections",
			tr: "Büyük kavşaklara kolay erişim",
		},
	},
	{
		name: {
			ar: "نظام أمان عالي التقنية",
			en: "High-Tech Security System",
			tr: "Yüksek Teknoloji Güvenlik Sistemi",
		},
		description: {
			ar: "نظام أمان متطور بأحدث التقنيات",
			en: "Advanced security system with the latest technology",
			tr: "En son teknoloji ile ileri düzey güvenlik sistemi",
		},
	},
	{
		name: {
			ar: "غرفة سينما منزلية",
			en: "Home Cinema Room",
			tr: "Ev Sineması",
		},
		description: {
			ar: "غرفة سينما مجهزة بالكامل",
			en: "Fully equipped home cinema room",
			tr: "Tamamen donatılmış ev sineması",
		},
	},
	{
		name: {
			ar: "تشطيبات فاخرة",
			en: "Luxury Finishes",
			tr: "Lüksif Tümleştirmeler",
		},
		description: {
			ar: "تشطيبات فاخرة عالية الجودة",
			en: "High-quality luxury finishes",
			tr: "Yüksek kaliteli lüksif tümleştirmeler",
		},
	},
	{
		name: {
			ar: "قرب من ملاعب الغولف",
			en: "Close to Golf Courses",
			tr: "Golf İstakları Yakın",
		},
		description: {
			ar: "تواجد قريب من ملاعب الغولف",
			en: "Close proximity to golf courses",
			tr: "Golf istakları yakın",
		},
	},
	{
		name: {
			ar: "غرفة معيشة واسعة",
			en: "Spacious Living Room",
			tr: "Geniş Oturma Odası",
		},
		description: {
			ar: "صالة معيشة واسعة ومريحة",
			en: "Large and comfortable living room",
			tr: "Geniş ve rahat oturma odası",
		},
	},
	{
		name: {
			ar: "حمام سباحة داخلي",
			en: "Indoor Swimming Pool",
			tr: "Dahili Yüzme Havuzu",
		},
		description: {
			ar: "مسبح داخلي مدفأ للاستمتاع بالسباحة طوال العام",
			en: "Heated indoor pool for year-round swimming",
			tr: "Yıl boyunca yüzme için ısıtılmış dahili yüzme havuzu",
		},
	},
	{
		name: {
			ar: "إضاءة LED عالية الكفاءة",
			en: "High-Efficiency LED Lighting",
			tr: "Yüksek Verimlilikli LED İşıkları",
		},
		description: {
			ar: "أنظمة إضاءة LED توفر كفاءة طاقية عالية",
			en: "LED lighting systems provide high energy efficiency",
			tr: "LED ışık sistemleri yüksek enerji verimliliği sağlar",
		},
	},
	{
		name: {
			ar: "تصميم داخلي فريد",
			en: "Unique Interior Design",
			tr: "Benzersiz İç Mimari",
		},
		description: {
			ar: "تصميم داخلي مميز يعكس الذوق الرفيع",
			en: "Distinctive interior design reflecting refined taste",
			tr: "Rafiye ile yansıyan benzersiz iç mimari",
		},
	},
	{
		name: {
			ar: "اتصال إنترنت عالي السرعة",
			en: "High-Speed Internet Connection",
			tr: "Yüksek Hızlı İnternet Bağlantısı",
		},
		description: {
			ar: "اتصال إنترنت سريع وموثوق",
			en: "Fast and reliable internet connection",
			tr: "Hızlı ve güvenilir internet bağlantısı",
		},
	},
	{
		name: {
			ar: "خدمات تنظيف منتظمة",
			en: "Regular Cleaning Services",
			tr: "Düzenli Temizlik Hizmetleri",
		},
		description: {
			ar: "توفير خدمات تنظيف دورية للمنزل",
			en: "Providing regular cleaning services for the home",
			tr: "Ev için düzenli temizlik hizmetleri sunuluyor",
		},
	},
	{
		name: {
			ar: "صيانة دورية",
			en: "Routine Maintenance",
			tr: "Düzenli Bakım",
		},
		description: {
			ar: "صيانة دورية للمرافق والتجهيزات",
			en: "Regular maintenance for facilities and equipment",
			tr: "Tesisler ve ekipman için düzenli bakım",
		},
	},
	{
		name: {
			ar: "أبواب آمنة",
			en: "Secure Doors",
			tr: "Güvenli Kapılar",
		},
		description: {
			ar: "أبواب معزولة وآمنة",
			en: "Insulated and secure doors",
			tr: "Izolasyonlu ve güvenli kapılar",
		},
	},
	{
		name: {
			ar: "حدائق مصممة بأسلوب فني",
			en: "Artistically Designed Gardens",
			tr: "Sanatsal Tasarlanmış Bahçeler",
		},
		description: {
			ar: "حدائق مزينة بعناية وذوق فني",
			en: "Carefully decorated gardens with artistic taste",
			tr: "Sanatsal bir zevkle dikkatli olarak dekorasyon yapılmış bahçeler",
		},
	},
	{
		name: {
			ar: "نظام معالجة المياه",
			en: "Water Treatment System",
			tr: "Su İşleme Sistemi",
		},
		description: {
			ar: "توفير نظام لتنقية ومعالجة المياه",
			en: "Providing a system for purifying and treating water",
			tr: "Suyu temizlemek ve işlemek için bir sistem sunuluyor",
		},
	},
	{
		name: {
			ar: "طاقم إداري محترف",
			en: "Professional Management Team",
			tr: "Uzman Yönetim Takımı",
		},
		description: {
			ar: "إدارة احترافية لتلبية احتياجاتك",
			en: "Professional management to meet your needs",
			tr: "İhtiyaçlarınızı karşılamak için uzman yönetim",
		},
	},
	{
		name: {
			ar: "مركز لليوغا",
			en: "Yoga Center",
			tr: "Yoga Merkezi",
		},
		description: {
			ar: "مركز متخصص لممارسة اليوغا",
			en: "Specialized center for practicing yoga",
			tr: "Yoga uygulamak için özel bir merkez",
		},
	},
	{
		name: {
			ar: "إمكانية التمويل",
			en: "Financing Available",
			tr: "Finansman Mevcut",
		},
		description: {
			ar: "توفير خيارات تمويل سهلة وميسرة",
			en: "Providing easy and accessible financing options",
			tr: "Sadece ve erişilebilir finansman seçenekleri sunuluyor",
		},
	},
	{
		name: {
			ar: "غرفة لتخزين النبيذ",
			en: "Wine Storage Room",
			tr: "Binoklü Depo",
		},
		description: {
			ar: "غرفة خاصة لتخزين وعرض النبيذ",
			en: "Special room for storing and displaying wine",
			tr: "Binoklü için özel bir odada saklanması ve görüntülenmesi",
		},
	},
	{
		name: {
			ar: "خزنة",
			en: "Safe",
			tr: "Güvenli",
		},
		description: {
			ar: "توفر خزنة آمنة لحفظ الأغراض الثمينة",
			en: "Provides a secure safe for storing valuables",
			tr: "Değerli eşyaları saklamak için güvenli bir güvenlik kasası sunuluyor",
		},
	},
	{
		name: {
			ar: "نظام مراقبة CCTV",
			en: "CCTV Surveillance System",
			tr: "CCTV İzleme Sistemi",
		},
		description: {
			ar: "نظام مراقبة تلفزيوني مغلق للأمان",
			en: "Closed-circuit television surveillance system for security",
			tr: "Güvenlik için kapalı döngü televizyon izleme sistemi",
		},
	},
	{
		name: {
			ar: "منطقة للترفيه",
			en: "Entertainment Area",
			tr: "Eğlence Alanı",
		},
		description: {
			ar: "منطقة مخصصة للترفيه والاستجمام",
			en: "Designated area for entertainment and relaxation",
			tr: "Eğlence ve rahatlama için ayrılmış bir alan",
		},
	},
	{
		name: {
			ar: "مدخل خاص",
			en: "Private Entrance",
			tr: "Özel Giriş",
		},
		description: {
			ar: "مدخل خاص لسكان الوحدة",
			en: "Exclusive entrance for unit residents",
			tr: "Birim sakinleri için özel giriş",
		},
	},
];
 

export default async () => {
	await Features.bulkCreate(features);
	await Users.create({
		name: "admin 1",
		user_name: "admin_1",
		password: "Test@1234",
		role: enumRoles.Admin,
	});
	await Users.create({
		name: "admin 2",
		user_name: "admin_2",
		password: "Test@1234",
		role: enumRoles.Admin,
	});
	await Users.create({
		name: "developer",
		user_name: "dev",
		password: "Test@1234Dev",
		role: enumRoles.Dev,
	});
};

import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../v2/organisms/PageHeader'

const PrivacyPolicy = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <PageContainer>
      <PageHeader
        spaceBottom
        spaceTop
        backButton
        title={translation.privacyPolicy}
      />
      <Typography variant='body1'>
        פלטפורמת היישום (להלן 'אנו', 'אנחנו', 'היישום' או 'החברה') מחוייבת להגן ולכבד את פרטיותך כמשתמש, מבקר, מתקשר או כל גורם המוסר מידע להיישום.
          <br />
          היישום מחויבת להגן על המידע האישי שלך (כהגדרות להלן) באופן העולה בקנה אחד עם חוקי הגנת המידע התקפים. נבקשך לקרוא בעיון את מדיניות זו ולהבין את עמדותיה ונהליה של היישום בנוגע למידע האישי שלך ולאופן בו תשתמש בשירותי היישום.
          <br />
          תנאי מדיניות הפרטיות המפורטים בלשון זכר הינם לשם נוחיות בלבד והיא מיועדת לכל המינים כאחד.
          <br />
        <br />
          אישור מדיניות הפרטיות ע'י המשתמש
          <br />
          שימושך בשירותי היישום (להלן: ”השירותים“) או רישום, הורדת מידע או כניסה לאתר האינטרנט ו/או לעמוד הפייסבוק, מהווים אישור מצדך כי ידועים לך או שניתנה אפשרות לקרוא את מדיניות הפרטיות ואת נהלי היישום המפורטים בה, לרבות עיבוד (כולל איסוף, שימוש, גילוי, החזקה או העברה) של מידע על פי תנאי מדיניות זו. המידע המוחזק על ידי היישום אודותיך עשוי להיות מוחזק ומעובד באמצעות קבצי מחשב ו/או מסמכי םבכתב.
          <br />
          במידה שתמסור להיישום כל מידע אודות אדם אחר, עליך להפנות את תשומת לבו של אדם זה כאמור למדיניות הפרטיות.
          <br /><br />
          סוגי המידע שנאסף על המשתמשים בשירות
          <br />
          היישום אוספת ”מידע אישי“ וכן ”מידע אנונימי“ אודות משתמשים ומבקרים. מידע אישי הנו מידע שניתן לעשות בו שימוש על מנת לתקשר עמך או לזהותך, כדוגמת שם מלא, כתובת דוא“ל, מספר טלפון, פרטי צורת תשלום, שם משתמש, ססמא, כתובת דואר, כתובת IP ותמונת פרופיל, וכן מידע המקושר למידע כאמור. ”מידע אנונימי“ הנו מידע שאינו מאפשר לנו לפנות אליך או לזהותך, ואינו קשור למידע שניתן להשתמש בו לצורך כך. מידע זה כולל מידע שנאסף באופן פאסיבי על פעילותך בפלטפורמת היישום, כגון נתוני שימוש (usage data), במידה שמידע כאמור אינו מקושר למידע האישי שלך.
          באפשרותך להכנס ולבצע חיפוש בחלקים מסוימים באתר, מבלי למסור מידע אישי, אף שכמו רוב ספקי אתרי האינטרנט והאפליקציות הסלולריות, אנו אוספים מידע מסוים ממכשיריך, כגון כתובת ה-IP, מידע רזולוציית מסך, מיקום גאוגרפי, פרטי WIFI, פרטי דפדפן, מספר זיהוי מכשיר ייחודי (להלן: ”UDID“) במידת הצורך ו/או מערכת ההפעלה הסלולרית שלך, ומשתמשים בערכות פיתוח למפתחים, כדוגמת Mixpanel, וערכות פיתוח אחרות למפתחים (SDK) לצורך השגת ניתוח מפורט אודות מכשירים. כמו כן, אנו אוספים מידע אודות מיקום גאוגרפי ממבקרים המשתמשים בפלטפורמה שלנו. לעתים, מידע זה, הנאסף באופן פאסיבי, יהיה מידע אישי ***. לתשומת לבך, באפשרותך לבחור שלא למסור לנו מידע מסוים (לדוגמא, באמצעות שינוי הגדרות העוגיות שלך) הבחירה אם למסור לנו כל מידע נתונה להחלטתך אולם אם לא תעשה כן, תיתכן הגבלה על מאפייני הפלטפורמה בהם תוכל להשתמש.
          <br />
        <br />
          מידע הנמסר מרצון

          מידע הנמסר לנו מיוזמתך במהלך שימושך בפלטפורמת היישום, להלן דוגמאות:
          <br />
          א. מידע אישי שתזין בעת הרשמתך או שימושך בפלטפורמת היישום, לרבות שמך המלא, כתובת דוא“ל, מספר טלפון, צורת התשלום, פרטי חיוב,  תמונת פרופיל ומידע פרופיל;
          <br />
          ב. תכתובת עמנו (לדוגמא דוא“ל, הודעות טקסט) או עם משתמשים אחרים (לדוגמא הנחיות שימוש בפריטים, תיאום זמני איסוף, בעל פה או בכתב)
          <br />
          ג. מידע הנמסר מיוזמתך במסגרת העדפותיך או במסגרת סקרים, לשירותי תמיכת לקוחות או בשיחות שירות לקוחות, או המתפרסם על ידך בכל פורום, לרבות מדיה חברתית ובלוגים. אנו רשאים להקליט את שיחות שירות הלקוחות לצורכי בקרת איכות ושיפור השירות.
          <br />
          ד. מתן שירותים או תוכן מקוון לצורך טיפול בבקשותיך ובפניותך, לרבות המידע הנמסר מיוזמתך בעת הרשמתך לפלטפורמה; רישו םלקבלת שירותים או הצעות מהיישום, הורדת מידע שפורסם בפלטפורמה, פרסום חומרים או בקשת שירותים נוספים מהיישום.
          <br />
          ה. מידע הנמסר מיוזמתך, לרבות תמונות או תגובות, בנוגע ל- או במסגרת השתתפות ב- מבצעים או תחרויות, הממומנות, מקודמות או מוצעות על ידי היישום ו/או כל צד ג‘, וכן כל מידע שנמסר להיישום במאצעות משוב, טפסי פרופיל או תקלות בפלטפורמה.
          <br />
          ו. מידע הנמסר מיוזמתך, לרבות עותק של תעודת הזהות או כרטיס האשראי שלך, בנוגע למקרים בהם יש צורך לוודא את זהו תהמשתמש ו/או א הבעלות באמצעי התשלום שנמסר.
          <br />
          ז. מידע אודותיך אשר נמסר מיוזמתך במסגרת תכתובת עם היישום באמצעות דוא“ל, דואר, מסרון, שירות הודעות מידיות (כחלק מפלטפורמת היישום), טלפון או באופן אחר, היישום תשמור תכתובת כאמור, על מנת להגיב לפניותיך ולשיפור השירות.
          <br />
          ח. מידע אחר שהתקבל במסגרת שימושך בפלטפורמה ו/או בשירותים, בתכנים ובפרסומות. בנוגע לכל ביקוריך בפלטפורמה, היישום רשאית לאסוף באופן אוטומטי נתוני אימות, מידע טכני ומידע אודות ביקורך בפלטפורמה, לרבות נתוני מחשב ונתוני חיבור, נתונים סטטיסטיים אודות צפייה בעמודי אינטרנט, תעבורה אל האתר וממנו, נתוני פרסומות, כתובות IP, פרטי יומני רשת סטנדרטיים ומשאבים בהם אתה משתמש.
          <br />
          מידע הנאסף באמצעות שימוש בפלטפורמה
          <br />
          א. נתוני מיקום גאוגרפי: במקרה של כניסה לפלטפורמה במאצעות מכשיר סלולרי או באמצעות מחשב, נהיה רשאים להיכנס, לאסוף, לנטר ו/או לאחסן מרחוק ”נתוני מיקום גאוגרפי“, העשויים לכלול קואורדינטות GPS של מיקומך, או מידע דומה בנוגע למיקומך.
          <br />
          ב. נתוני עסקאות: אנו אוספים מידע שנוצר במהלך מגוון שימושיך בשירות, לרבות תאריך וזמן כל עסקה שביצעת באמצעות שירות היישום, הסכום שחויב, לרבות פירוט תשלום הבסיס, תשלומים נוספים וכן מסירת קוד מבצע.
          <br />
          מידע שנאסף באמצעות טכנולוגיה
          <br />
          א. במידה שתשתמש בפלטפורמת היישום, ייאסף ממך מידע, לרבות מודל החומרה, סוג דפדפן, מערכת ההפעלה, פרוטוקול האינטרנט (IP) ושם דומיין. אם תמשמש במכשיר סלולרי, נהיה רשאים בנוסף לקבל את הUDID או מזהה ייחודי אחר ואת מערכת ההפעלה הסלולרית. נהיה רשאים לבצע התאמה של מידע זה למידע האישי האחר הנמצא בידיו. כמו כן, אנו רשאים לעשות שימוש בעוגיות ובמידע URL לצורך איסוף מידע בנוגע לתאריך ולזמן השימוש בשירות, וכן בנוגע למידע אותו חיפשת ושאליו הגעת.
          <br />
          ב. בנוגע לשימושך בפלטפורמה, אנו רשאים לקבל את נתוני השיחות שלך, לרבות תאריך ושעת שיחות ומסרונים עם היישום או עם משתמשים אחרים, מספרי טלפון של הצדדים ותוכן המסרונים כאמור.
          <br />
          ג. כמו כן, אנו רשאים להשתמש בשירותי מעקב צד ג‘, כגון Google Analytics ויומני שימוש, על מנת לעקוב אחר- ולנתח מידע ממשתמשי השירות לצורכי אבטחה, מניעת הונאות ומניעת הלבנת הון.
          <br />
          ד. אם תבחר לבצע תשלום עבור נסיעה באמצעות ספק שירותי תשלום צד ג‘ (לדוגמא PayPal), המידע האישי שלך (למעט פרטי כרטיס התשלום המלאים שלך) אשר התקבלו על ידי ספק שירותי התשלום עשוי להימסר על ידו.
          <br />
          ה. אם תבחר להתחבר לפלטפורמה באמצעות רשת חברתית מסויימת (לדוגמא, פייסבוק), מידע אישי אודותיך עשוי להימסר לנו ע“י אותה רשת חברתית.
          <br />
          ו. כמו כן, אנו רשיאם לשתף את נתוניך עם ספק שירות נתונים סטטיסטי צד ג‘, אך ורק לצורך מתן נתונים סטטיסטיים ולצורך הבנת צרכי המשתמשים.
          <br />
          מידע שנמסר ע'י אחרים (גורמי צד שלישי וכו')
          <br />
          היישום אוספת מידע הנמסר על ידי משתמשיה אודות משתמשים אחרים ולהיפך, לרבות באמצעות דירוגים ופרסומים בפורומים.
          <br />
          היישום רשאית לקבל מידע אודותיך אם תשתמש בשירותים אחרים הניתנים על ידה. כמו כן, היישום משתפת פעולה עם צדדים שלישיים (לרבות, לדוגמא, שותפים עסקיים, קבלני משנה המעניקים שירותים טכניים, שירותי תשלום ושליחויות, רשתות פרסום, ספקי נתונים סטטיסטיים, ספקי מידע חיפוש, סוכנויות דירוג אשראי) ורשאית לקבל מהם מידע אודותיך. במידה שצדדים שלישיים אוספים מידע אודותיך ומוסרים לנו מידע כאמור, עליך לעיין במדיניות או בהודעות הפרטיות הנפרדות שלהם.
          <br />
          מידע אודות מכשירים
          <br />
          א. היישום אוספת מידע אודות המכשיר המשמש אותך לכניסה לפלטפורמה שלה או לשירותיה, אשר עשוי לכלול מידע אישי. מידע זה משמש לצורך זיהוי מכשירך, על מנת לקשר אותו לחשבונך. פעילות זו מבוצעת לצורכי אבטחה, בטחון, הערכת ביצועי הפלטפורמה, שיפור חוויית הלקוח, מניעת הונאות והוא כולל מסירת מידע אודות מכשירך, לרבות נתונים אישיים מוגבלים, כתובת IP, נתוני WiFi ונתוני מיקום, לנותני שירות צד ג‘.
          <br />
          ב. סוג מכשירך שמו ואופן שימושך בו, הדפדפן (לדוגמא דפדפן האינטרנט המשמש אותך, כגון : Chrome, Firefox, Internet Explorer והגדרות הדפדפן שלך) וכן אפליקציות ו-ווידג‘טים שהותקנו (להלן: ”האפליקציות המותקנות“), לרבות שם האפליקציות המותקנות, זיהוי משתמש, מערכת, מועד התקנה, מועד עדכון, גרסא והאם הן נמצאות בדף הבית. כמו כן, אנו אוספים מידע אודות פעולותיך בפלטפורמות שלנו המותקנות כאמור, לרבו תפתיחה, סגירה, או הסרה ומשך השימוש. איננו אוספים נתונים מתוך האפליקציות המותקנות, למעט נתונים מצטברים בנוגע לשימוש עצמו.
          <br />
          עוגיות וקבצי או תגיות רשת אחרות
          <br />
          א. על מנת לשוות לפלטפורמה של היישום מראה אטרקטיבי ועל מנת לאפשר שימוש במאפייניה, אנו משתמשים עוגיות בדפים שונים של הפלטפורמה שלנו, וכן בקבצים ותגיות אחרים (כגון תגיות JavaScript). עוגיות מכילות קבצי טקסט קטנים המאוחסנים במכשירך.
          <br />
          ב. רוב העוגיות המשמשות אותנו יימחקו מהכונן הקשיח לאחר סיום גלישתך באתר שלנו (עוגיות זמניות).
          <br />
          ג. עוגיות אחרות נשמרות בכונן הקשיח של מכשירך, ומאפשרות לנו לזהות את מכשירך בביקורים עתידיים באתר האינטרנט שלנו (עוגיות קבועות/Persistent Cookies). עוגיות אלו, במיוחד, מאפשרות לנו להפוך את אתר האינטרנט לידידותי למשתמש, יעיל ובטוח. לדוגמא, הודות לקבצים אלו, באפשרותנו להציג מידע המותאם להעדפותיך האישיות בדף אינטרנט מסוים. זמן פעולה של עוגיה בדפדפן הנו 18 שעות.
          <br />
          ד. בין היתר, יעקבו העוגיות אחר הקלקות ופעילות מקוונת.
          <br />
          ה. מטעם זה, פלטפורמת היישום מכילה עוגיות וקבצים מקומיים אחרים, על מנת להבדיל בינך לבין משתמשים אחרים. היישום רשאית להשתמש בעוגייה או בקובץ קונפיגורציה, המאוחסן בדפדפן או בכונן הקשיח של מחשבך או של מכשיר הטלפון הסלולרי שלך, על מנת להשיג מידע אודות שימושך הכללי באינטרנט. עוגיות וקבצים אחרים המכילים מידע המועבר למחשבך ו/או לכונן הקשיח במכשיר הטלפון הנייד שלך, מסייעים להיישום לשפר את אתר הפלטפורמה שלה ולספק שירות משופר ומותאם אישית. הם מאפשרים להיישום:
          <br />
          ו. לאמוד את גודל קהל המשתמשים של פלטפורמת היישום, את דפוסי השימוש בשירות וכן מידע סטטיסטי אחר.
          <br />
          ז. לאסוף מידע אודות מיקומך הגאוגרפי המוערך (לדוגמא,עיר) על מנת לספק לך תכנים מבוססי מיקום.
          <br />
          ח. לשמור מידע אודות העדפותיך ולאפשר להיישום לבצע התאמה אישית של הפלטפורמה, בהתאם לתחומי העניין שלך ולמכשיר או לדפדפן המשמשים אותך.

          ט. לשפר באופן מתמיד את שירותי היישום.

          י. לזהותך בעת חזרתך לאתר.

          כ. למנוע הונאות ו/או שימוש לרעה.

          ל. הבסיס החוקי לעיבוד המידע הנמצא בעוגיות ובקבצים או בתגיות אחרות מורכב מביצוע ההסכם עמך (על פיו עוגיות נחוצות כחלק מחוית המשתמש של הלקוח), או מהאינטרסים הלגיטימיים שלנו לאבטחת אתר האינטרנט שלנו והצגתו באופן ידידותי למשתמש.

          מ. באפשרותך לחסום עוגיות באמצעוות הפעלת הגדרות מסוימות בדפדפן, המאפשרות לך לסרב להצבת עוגיות באופן מלא או באופן חלקי. עם זאת, אם תבחר הגדרות מחמירות מדי, עשויה לא להיות לך גישה לחלקים מסוימים בפלטפורמה. אלא אם תגדיר חסימת עוגיות בדפדפן, מערכת היישום תיצור עוגיה בעת התחברות לאתר ו/או שימוש באפליקציה.

          נ. פונקציית ה-”עזרה“ בתפריט במרבית הדפדפנים כוללת הסר לגבי אופן מניעת קבלת עוגיות בדפדפן (באופן מלא או באופן חלקי), אופן מחיקת כל העוגיות שנאספו ואופן חסימת עוגיות עתידיות.

          ס. להלן פעולות לניהול עוגיות בדפדפנים נפוצים:
          ב -Internet Explorer
          1. בחר בפריט “Internet Options” בתפריט ה-“Extras” בסרגל הכלים.
          2. בחר בלשונית “Privacy”
          3. כעת, בחר את הגדרות הבטיחות לאזור האינטרנט. עליך לבחור את העוגיות שיאושרו או שיידחו.
          4. לאישור ההגדרות, לחץ “OK”.
          ב-Firefox:
          1. בחר “Settings” בסרגל הכלים.
          2. לחץ על “Privacy”.
          3. בחר “Use custom settings for history” בתפריט הנפתח.
          4. כעת, בחר האם לאשר עוגיות ואת משך זמן שמירתן. באפשרותך להוסיף חריגים ולקבוע אלו אתרים יוכלו לשמור עוגיות תמיד ואלו אתרים לעולם לא יוכלו לשמור עוגיות.
          5. הקש “OK” לאישור ההגדרות.
          ב-Google Chrome:
          1. בחר את סמל התפריט בסרגל הכלים בדפדפן.
          2. לחץ על “Settings”.
          3. לחץ על הקישור “Show advance settings”
          4. לחץ על “Content Settings…”.
          5. באופציה “Cookies”, בחר את ההגדרות הבאות:
          – Erase cookies
          – Block cookies by default
          – Erase cookies and website data by default after ending your browser session
          – Accept exceptions for cookies from certain websites or website domains.

          ע. זכור, במידה שתבחר להגביל את העוגיות במחשבך, יוגבל שימושך בפונקציות מסוימות באתר
          האינטרנט.

          כלי ניתוח מידע וטכנולוגית אינטרנט

          Google Analytics

          אתר אינטרנט זה עושה שימוש ב-Google Analytics, שירות ניתוח אינטרנטי של Google Inc. (להלן: “Google”) וכן ב-Mixpanel ובערכות פיתוח אחרות למפתחים (SDK). Google Analytics עושה שימוש בעוגיות. ככלל, המידע אודות שימושך באתר האינטרנט, כפי שהנו מוצג בעוגיות, מועבר לשרת גוגל בארצות הברית ונשמר בו. אנו מפעילים באתר אינטרנט זה כלי אנונימיזציה ל- IP, משמע Google מקצרת את כתובות ה-IP ממדינות האיחוד האירופי או ממדינות ה-EEA (האזור הכלכלי האירופי) לפני שליחתן לשרת בארצות הברית. רק במקרים חריגים תועברנה כתובות IP מלאות לשרת Google בארצות הברית, לפני קיצורן.

          על פי הוראותינו, Google תשתמש במידע לצורך ניתוח שימושך באתר האינטרנט, לצורך הפקת דוחות אודות פעילות באתר האינטרנט ולצורך קבלת שירותים על ידינו בנוגע לשימוש באתר האינטרנט וברשת האינטרנט. כתובת ה-IP המועברת באמצעות הדפדפן ואשר תקוצר לפני שמירתה לצורך שימוש לצרכי Google Analytics לא תתווסף לנתוני Google אחרים. תוכל למנוע אחסון עוגיות באמצעות הגדרות הדפדפן (ראה סעיף 5.8), עם זאת, זכור כי במקרים מסוימים, שימושיות האתר עשויה להיפגע בשל כך. לפרטים נוספים אודות השימוש במידע ב-Google Analytics ראה מדיניות הפרטיות של Google:
          https: //www.google.com/policies/privacy.
          Google מעניקה תוסף לדפדפן, המאפשר למשתמשים לנטרל את השימוש ב-Google Analytics בכל האתרים. להורדת התוסף: https: //tools.google.com/dlpage/gaoptout.

          Retargeting

          אתר האינטרנט עושה שימוש בטכנולוגיות Retargeting, המופעלות על ידי מפעילים אחרים. באמצעות Retargeting, משתמשים באתרי האינטרנט של שותפינו, אשר הביעו עניין באתר האינטרנט שלנו ובשירותינו בעבר, יוכלו לקבל פרסומות מותאמות אישית. על פי מחקרים, פרסומות מותאמות אישית, הקשורות לתחומי העניין האמיתיים של אנשים, הנן בעלות ערך למשתמשים, יותר מאשר פרסומות שאין להן קשר אישי. באמצעות Retargeting, שילוב פרסומות מבוסס על הניתוח המתקבל על ידי עוגיות המציגות את פעילותו הקודמת של המשתמש. אם ברצונך לא לקבל סוג פרסומות זה, תוכל לנטרל את העוגיות ו/או למחוק עוגיות קיימות באמצעות הגדרות הדפדפן. ניתן לעשות זאת באמצעות ההוראות המופיעות באופציית “Cookies”.

          הבסיס החוקי המאפשר את עיבוד נתוניך ואת השימוש בכלי ניתוח קולקטיביים ובטכנולוגיות אינטרנט, לצורך האינטרס הלגיטימי שלנו לביצוע ניתוח של הפעילות באתר האינטרנט ושל התנהלות הגולשים באתר, בייחוד לצרכי מחקר, בינה עסקית ופיתוח מוצרים, וכן לצורך האינטרס הלגיטימי שלנו (ושל צדדים שלישיים) בהתאמת פרסומות לתחומי העניין שלך.

          נתוני רצף הקלקות (CLICKSTREAM DATA)
          במהלך גלישה באינטרנט, נותר שובל של מידע אלקטרוני בכל אתר אינטרנט בו ביקרת. מידע זה, המכונה לעתים נתוני רצף הקלקות (Clickstream Data), עשוי להיאסף ולהישמר בשרת אתר האינטרנט. נתוני רצף ההקלקות מספקים לנו מידע אודות סוג המחשב ותכנת הדפדפן, כתובת אתר האינטרנט ממנה הגעת לאתר האינטרנט, ובמקרים מסוימים, כתובת הדוא”ל שלך. אנו רשאים להשתמש בנתוני קצף הקלקות על מנת לקבוע את משך הזמן בו שוהים גולשים בכל דף באתר האינטרנט ואופן גלישתם באתר. מידע זה ישמש אותנו לצורך שיפור והתאמה אישית של אתר האינטרנט בלבד.
          <br /><br />
          אופן השימוש במידע<br />
          היישום משתמשת במידע אודותייך (הן מידע אישי והן מידע אנונימי) למטרות הבאות:
          לצורך רישום וניהול חשבונך;
          לצורך מתן שירותים שונים, כמפורט באתר האינטרנט של החברה;
          על מנת לספק שירות לקוחות;
          על מנת להבטיח כי תכני אתר האינטרנט מוצגים באופן יעיל, עבורך ועבור מכשירך (לדוגמה, מחשב, טלפון סלולרי ומחשב לוח);
          לצורך ביצוע התחייבויות היישום, על פי כל ההסכמים שנחתמו בינך ובין היישום (לרבות, מבלי לגרוע מכלליות האמור, לצורך מתן מידע, טובין ו/או שירותים שיתבקשו מאיתנו);
          לאמת ולפרוע קופונים של צדדים שלישיים לנסיעות היישום ולהודיע לשותפי צד ג’ אודות נסיעות תקפות המזכות בצבירת נקודות בתכניות נאמנות של צדדים שלישיים.
          לצורך מסירת מידע (בדוא”ל, במסרון, בשירות הודעות מידיות, בדואר או בטלפון) אודות טובין ושירותים אחרים המוצעים על ידי היישום, הדומים לטובין ולשירותים שנרכשו על ידך או שנבדקו על ידך, או שבהם הבעת עניין, לאחר קבלת הסכמתך, במידת הצורך (ובכל מקרה, בכפוף לזכותך לסרב לקבלת הודעות שיווקיות, ראה סעיף 13.1);
          לצורך מסירת מידע (בדוא”ל, במסרון, בשירות הודעות מידיות, בדואר או בטלפון) אודות טובין ושירותים המוצעים על ידי שותפי השיווק של היישום, הרלבנטיים לשירותים שביקשת מ-היישום, או העשויים לעניין אותך, לאחר קבלת הסכמתך, במידת הצורך (ובכל מקרה, בכפוף לזכותך לסרב לקבלת הודעות שיווקיות, ראה סעיף 13.1);
          על מנת לאפשר השתתפות במאפיינים אינטראקטיביים של שירותי היישום, במידה שתבחר לעשות כן;
          על מנת לפנות אליך לצורך קבלת משוב על שירותי היישום ולמסור הודעות אודות שינויים או חידושים בשירותי היישום;
          לצורך ניהול אתר האינטרנט, ולצורך פעילות פנימית, לרבות פתרון תקלות, ניתוח נתונים, בדיקות, מחקר, קבלת נתונים סטטיסטיים וביצוע סקרים;
          במסגרת מאמצי היישום לשמור על אבטחת אתר האינטרנט ולצורך מניעת הונאות;
          לצורך מדידת או הבנת יעילותם של פרסומים של היישום המופנים כלפיך וכלפי אחרים, ולצורך הפניית פרסומים רלבנטיים עבורך.
          לצורך שיפור אתר האינטרנט, לרבות התאמתם לצרכיך;
          לצורך שימוש ב-GPS על מנת לזהות את מיקום המשתמשים;
          לצורך ציות לחובותיה המשפטיות של היישום;
          לצורך הגנה על זכויות היישום.
          נותני שירות צד ג’ של היישום רשאים להצליב את נתוניך עם נתונים הנשמרים על ידם (בנפרד מ-היישום) על מנת למסור ל-היישום ניתוח סטטיסטי של נתונים דמוגרפיים של משתמשי היישום. היישום משתמשת במידע אנליטי מצטבר ואנונימי לצורך תכנון עסקי ולמטרות דומות אחרות.
          על פי דיני הגנת המידע של האיחוד האירופי, כל עיבוד של נתונים אישיים יוצדק על ידי “תנאי”. ברוב המקרים, כל עיבוד יבוצע בתנאי ש-:
          א. נתת את הסכמתך לעיבוד המידע (לדוגמה, מקום בו נתת הסכמה לקבלת חומרים שיווקיים או להשתתפות בשירותים או בפונקציות אופציונליים נוספים);
          ב. עיבוד המידע נחוץ לצורך ביצוע ההסכם ביננו (כלומר, לצורך מתן שירותי נסיעה) או על מנת לבצע פעולות לקראת חתימה על הסכם;
          ג. אנו זקוקים לעבד את המידע על מנת לציית לחובה משפטית רלבנטית (לדוגמה, לצורך מסירת מידע לרשויות אכיפת חוק או לרשויות המס); או
          ד. עיבוד המידע נחוץ לצרכינו המסחריים הלגיטימיים, בכפוף לזכויותיך הבסיסיות (לדוגמה, ניטור המבוצע על ידינו בנוגע לשימושך באפליקציה ולפרסום ממוקד).

          אבטחת ושמירת מידע

          היישום מיישמת אמצעים אדמיניסטרטיביים, פיזיים ואלקטרוניים שנועדו להגן על המידע האישי שלך מפני גישה בלתי מורשית. היישום תפעל בהתאם לדין החל במקרה של כל פגיעה באבטחה, בסודיות או בשלמות המידע האישי שלך, ובמידה שנראה לנכון או אם נידרש על פי הדין החל, נמסור לך הודעה באמצעות דוא”ל, במסרון או באמצעות פרסום בולט באתר האינטרנט, בהקדם האפשרי וללא דיחוי בלתי סביר, ככל שהדבר עולה בקנה אחד עם (1) צרכים לגיטימיים של אכיפת חוק או (2) כל אמצעי הנחוץ לצורך קביעת היקף ההפרה ולהשבתה על כנה של שלמות מערכת המידע.

          אף שלא ניתן לערוב לאבטחת המידע באינטרנט או מחוץ לו, אנו עושים מאמצים סבירים מבחינה מסחרית לאסוף את המידע ולאבטחו בהתאם למדיניות הפרטיות ולכל החוקים והתקנות החלים.

          במידה שקיבלת מ-היישום (או בחרת) שם משתמש, קוד כניסה או סיסמה, המעניקים לך גישה לחלקים מסוימים באתר האינטרנט ו/או באפליקציה, באחריותך לשמור על סודיות מידע כאמור. היישום מבקשת כי לא תמסור לאף אדם את שם המשתמש, קוד הכניסה או הסיסמה.

          היישום מגבילה את הגישה למידע האישי שלך לאנשים הזקוקים לגישה כאמור על מנת לעבדו עבורה. במידה שהנם עובדים, אנשים כאמור יהיו כפופים להסכמי סודיות, ו-היישום תנקוט בצעדים הולמים (לרבות צעדים משמעתיים) במידה שתגלה כי העובד(ים) לא עמדו בסטנדרטים שנקבעו להגנת המידע האישי שלך. היישום לא תישא בכל אחריות בנוגע לעובדים או לנציגים שפעלו שלא במסגרת מהלך העסקים הרגיל, או בנוגע לעובדים או כל צדדים שלישיים הרשאים לקבל מאיתנו מידע אישי (כמפורט בסעיף המופיע לעיל) והפועלים באופן המנוגד להסכמים שנחתמו עמם.

          המידע האישי שלך יישמר על ידינו אך ורק למשך הזמן הנחוץ לקיום המטרה(ות) לשמה(ם) נאסף(ו) ולצורך ציות לדין החל.

          לפיכך, ככלל, נשמור את המידע כל עוד חשבונך ב-היישום קיים או כל עוד יש צורך בכך לצורך מתן שירותי היישום, למעט מקום בו קיים צורך חוקי לשמרו פרק זמן ארוך יותר (לדוגמה, לאחר ביצוע הסכם במלואו, אנו עשויים להיות רשאים להשתמש בפרטי הקשר שלך למטרות שיווק). כמו כן, אנו רשאים לשמור את המידע הנחוץ לנו לצורך ביצוע מטלות תלויות ועומדות וכן את המידע הנחוץ לנו לצורך בדיקת ומימוש זכויותינו ותביעותינו החוקיות, וכן מידע מסוים העשוי להישמר על ידינו לתקופה הנדרשת על פי חוק. מקום בו מידע מסוים נשמר אך ורק בשל קיום תקופת שמירה הקבועה בחוק, אזי עיבודו יהא מוגבל, אף אם לא תבקש זאת במפורש.


          גילוי ומסירת מידע

          אנו מכירים בחשיבות השמירה על סודיות המידע האישי שלך. לפיכך, לא נשכיר, נמכור או נמסור את המידע האישי שלך לצדדים שלישיים, אלא אם תאשר לנו לעשות זאת באופן מפורש במועד הגילוי או בנסיבות המפורטות במדיניות פרטיות זו.

          אם הנך מתנגד לשימוש או לגילוי של מידע סודי שנאסף אודותיך בדרכים הנזכרות במדיניות הפרטיות, באפשרותך לבחור (1) לא למסור מידע אישי בכל עת או (2) לא להשתמש בשירות.

          בנוסף לשימוש במידע שנאסף על ידינו למטרות המתוארות בסעיף המופיע לעיל, אנו רשאים גם למסור את המידע שלך, כמפורט להלן. נא עיין היטב במדיניות מסירת המידע של היישום, בייחוד בנוגע למידע אישי.
          <br />
          נותני שירותים
          <br />
          כמו כן, אנו מוסרים מידע אישי לספקים, נותני שירותי תשלום, חברות שיווק, נותני חסות, ספקי תוכנות מסחריות, יועצים, חוקרי שוק ומעבדי נתונים, המבצעים שירותים עבור היישום, לרבות, מבלי לגרוע מכלליות האמור, חברות המספקות ייעוץ מסלולים, הערכת זמני הגעה, שירותי דוא”ל ואחסון של אתר האינטרנט והשירות. כמו כן, אנו מוסרים מידע אישי לצדדים שלישיים המספקים שירותי ניתוח, ניטור ודוחות על מנת לסייע לנו במניעה וזיהוי של הונאות ופעולות אחרות. היישום בחרה חברות השומרות על סטנדרטים גבוהים של פרטיות ומסכימות להשתמש במידע האישי אך ורק לצורך ביצוע שירותים ספציפיים עבור היישום ובהתאם להוראות מדיניות פרטיות זו.
          <br /><br />
          מידע אנונימי
          <br />
          מידע אנונימי מצטבר הנו שילוב מידע אנונימי שלך עם מידע אנונימי של משתמשים אחרים (להלן: “מידע אנונימי מצטבר”). מידע אנונימי מצטבר אינו מאפשר זיהוי או יצירת קשר עם המשתמש. אנו רשאים למסור מידע אנונימי מצטבר כאמור לצדדים שלישיים, ובהתאם לנסיבות, אנו רשאים לחייב או לא לחייב צדדים שלישיים בגין מידע כאמור או להגביל שימוש במידע על ידי צדדים שלישיים.
          <br /><br />
          אירועים עסקיים
          <br />
          אנו רשאים למסור את המידע האישי שלך, כולו או חלקו, לכל חברת אם, חברת בת, מיזמים משותפים או חברות אחיות של היישום, ובמקרה כאמור נדרוש מגופים כאמור לפעול בהתאם למדיניות פרטיות זו. כמו כן, במידה שנעבור שינוי עסקי כגון מיזוג, רכישה על ידי חברה אחת או מכירה של כל או מרבית נכסי החברה, לרבות במקרה בלתי סביר של פשיטת רגל, ייתכן שהמידע האישי שלך ייכלל בנכסים המועברים. הנך מאשר כי העברות כאמור עשויות להתרחש וכי הנן מותרות על פי מדיניות פרטיות זו, וכי כל גוף הרוכש את היישום, מתמזג עמה או הרוכש את נכסיה רשאי להמשיך לעבד את המידע האישי שלך, כמפורט במדיניות פרטיות זו.
          <br /><br />
          שיווק על ידי צדדים שלישיים
          <br />
          כמפורט לעיל, היישום רשאית למסור מידע לשותפים נבחרים, העשויים להיות רלבנטיים עבורך. חברות אלו עשויות לפנות אליך בדואר, בדוא”ל, בטלפון או בפקס, לצרכי שיווק וקידום מכירות.
          <br /><br />
          מיקום המידע
          <br />
          המידע הנאסף ממך על ידי היישום עשוי להיות מועבר ומאוחסן במדינה שאינה מציעה רמה הולמת של אבטחת מידע כנדרש על פי חוקי מדינתך. כמו כן, המידע עשוי להיות מעובד על ידי עובדים הפועלים מחוץ למדינתך, העובדים עבור היישום או עבור ספקיה, נותני השירות שלה או שותפיה. מסירת המידע האישי על ידך מהווה אישורך, ואם נדרש על פי הדין המקומי, הסכמתך, להעברה, אחסון או עיבוד מידע כאמור.
          <br />
          היישום תנקוט בפעולות הולמות על מנת להבטיח כי המידע האישי שלך יטופל באופן מאובטח ועל פי חוקי הפרטיות החלים ומדיניות פרטיות זו. פעולות אלו עשויות לכלול חתימה על הסכמי העברת מידע או הבטחת ציות למנגנונים או תכניות להעברת מידע על ידי היישום או צדדים שלישיים. במידה שהנך נמצא באיחוד האירופי, הנך רשאי לבקש לקבל מידע נוסף אודות מנגנוני העברת המידע המשמשים לצורך העברת המידע האישי למדינות שלישיות.
          <br />
        <br />
          ילדים
          <br />
          הפלטפורמה אינם מיועדים או מופנים לילדים מתחת לגיל 18, ו-היישום אינה אוספת ביודעין מידע אישי מזהה מילדים מתחת לגיל 18. על משתמשים מתחת לגיל 18 לקבל הסכמת הורה או משמורן לצפייה באתר או לשימוש באפליקציה. אם ייוודע לנו כי ילד מתחת לגיל 18 מסר מידע אישי מזהה באתר האינטרנט, נעשה מאמצים סבירים להסיר מידע זה מתיקיות האתר. שירותינו אינם מופנים לילדים מתחת לגיל 18 ואיננו מעוניינים לקבל מידע אישי מילדים מתחת לגיל 18. במידה שהנך סבור שנמסר לנו מידע על ידי ילד מתחת לגיל 18, אנא פנה אלינו.
          <br />
          שינויים במדיניות הפרטיות של היישום
          <br />
          היישום רשאית לשנות את מדיניות הפרטיות מעת לעת. כל שינויים עתידיים במדיניות הפרטיות יפורסמו בדף זה, ואם תראה היישום לנכון, יימסרו לך בהודעה (לרוב באמצעות דוא”ל). לפיכך, עליך לבדוק כל שינויים במדיניות הפרטיות לפני שתמסור ל-היישום מידע אישי. תאריך הגרסה העדכנית יופיע בעמוד
        </Typography>
    </PageContainer>
  )
}

export default PrivacyPolicy
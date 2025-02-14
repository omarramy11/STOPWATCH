// المتغيرات الأساسية
let startTime; // وقت بدء ساعة الإيقاف
let elapsedTime = 0; // الوقت المنقضي
let timerInterval; // مؤشر الفاصل الزمني
let isRunning = false; // حالة ساعة الإيقاف (تعمل أم متوقفة)

// دالة لتحويل الوقت من ثوانٍ إلى تنسيق ساعات:دقائق:ثوانٍ
function formatTime(time) {
    let hours = Math.floor(time / 3600); // حساب الساعات
    let minutes = Math.floor((time % 3600) / 60); // حساب الدقائق
    let seconds = Math.floor(time % 60); // حساب الثواني

    // إرجاع الوقت بتنسيق مكون من خانتين لكل جزء
    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0')
    );
}

// دالة لتحديث العرض بالوقت الحالي
function updateDisplay() {
    const display = document.querySelector('.display'); // الحصول على عنصر العرض
    display.textContent = formatTime(elapsedTime); // تحديث النص بالوقت الحالي
}




// دالة لبدء أو إيقاف ساعة الإيقاف
function startStopwatch() {
    if (!isRunning) {
        // إذا كانت الساعة متوقفة، نبدأها
        startTime = Date.now() - elapsedTime * 1000; // حساب وقت البدء
        timerInterval = setInterval(() => {
            elapsedTime = Math.floor((Date.now() - startTime) / 1000); // حساب الوقت المنقضي
            updateDisplay(); // تحديث العرض
        }, 1000); // تحديث كل ثانية
        document.getElementById('startStop').textContent = 'إيقاف'; // تغيير نص الزر إلى "إيقاف"
        isRunning = true; // تغيير الحالة إلى "تعمل"
    } else {
        // إذا كانت الساعة تعمل، نوقفها
        clearInterval(timerInterval); // إيقاف الفاصل الزمني
        document.getElementById('startStop').textContent = 'بدء'; // تغيير نص الزر إلى "بدء"
        isRunning = false; // تغيير الحالة إلى "متوقفة"
    }
}

// دالة لإعادة ضبط ساعة الإيقاف
function resetStopwatch() {
    clearInterval(timerInterval); // إيقاف الفاصل الزمني
    elapsedTime = 0; // إعادة الوقت المنقضي إلى الصفر
    updateDisplay(); // تحديث العرض
    document.getElementById('startStop').textContent = 'بدء'; // تغيير نص الزر إلى "بدء"
    isRunning = false; // تغيير الحالة إلى "متوقفة"
}

// إضافة مستمعي الأحداث للأزرار
document.getElementById('startStop').addEventListener('click', startStopwatch); // زر البدء/الإيقاف
document.getElementById('reset').addEventListener('click', resetStopwatch); // زر إعادة الضبط
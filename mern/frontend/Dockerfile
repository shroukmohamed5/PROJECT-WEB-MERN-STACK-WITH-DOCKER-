# وما توفيقي إلا بالله عليه توكلت وهو رب العرش العظيم
FROM node:18

# حدد مجلد العمل داخل الكونتينر
WORKDIR /app

# انسخ ملفات package.json و package-lock.json (لو موجودة)
COPY package*.json ./

# ثبت الـ dependencies داخل الكونتينر (مش من جهازك)
RUN npm install

# انسخ باقي ملفات المشروع
COPY . .

# فعّل المنفذ اللي Vite بيستخدمه
EXPOSE 5173

# شغّل التطبيق
CMD ["npm", "run", "dev", "--", "--host"]

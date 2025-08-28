
1. getElementById, getElementsByClassName এবং querySelector / querySelectorAll এর পার্থক্য

document.getElementById('id')

a.এটি একটি নির্দিষ্ট আইডি (id) অনুযায়ী একটি মাত্র এলিমেন্ট সিলেক্ট করে।

b.সবসময় একটি এলিমেন্ট বা null রিটার্ন করে।

document.getElementsByClassName('className')

a.এটি একই ক্লাস নামের সব এলিমেন্টের একটি HTMLCollection (লাইভ কালেকশন) রিটার্ন করে।

b.সরাসরি অ্যারে নয়, তবে অ্যারের মতো ব্যবহার করা যায় (ইনডেক্স দিয়ে অ্যাক্সেস করতে হয়)।

document.querySelector('selector')

a.এটি CSS সিলেক্টরের মতো করে প্রথম মিলে যাওয়া একটি মাত্র এলিমেন্ট রিটার্ন করে।

document.querySelectorAll('selector')

a.এটি CSS সিলেক্টরের মতো করে সব মিলে যাওয়া এলিমেন্টের একটি স্ট্যাটিক NodeList রিটার্ন করে।

b.forEach ইত্যাদি মেথড ব্যবহার করা যায়।

2. কিভাবে নতুন এলিমেন্ট তৈরি ও DOM-এ ইনসার্ট করবেন?

নতুন এলিমেন্ট তৈরি:

const newDiv = document.createElement('div');
newDiv.textContent = 'Hello!';


DOM-এ যোগ করা (append):

document.body.appendChild(newDiv);


অন্য জায়গায় ইনসার্ট করা:

const parent = document.getElementById('container');
parent.appendChild(newDiv);



3. Event Bubbling কী এবং এটি কিভাবে কাজ করে?

ইভেন্ট বাবলিং বলতে বোঝায় যে, যখন কোনো চাইল্ড এলিমেন্টে ইভেন্ট ট্রিগার হয়, তখন সেটি প্রথমে সেই এলিমেন্টে কাজ করে, তারপর ধাপে ধাপে তার প্যারেন্ট, গ্র্যান্ডপ্যারেন্ট ইত্যাদির দিকে উপরের দিকে ছড়িয়ে পড়ে।



4. Event Delegation কী? কেন দরকার?

ইভেন্ট ডেলিগেশন হল একটি টেকনিক যেখানে আমরা প্যারেন্ট এলিমেন্টে একটি ইভেন্ট লিসেনার দেই, এবং সেই প্যারেন্টের চাইল্ডদের ইভেন্ট হ্যান্ডলিং প্যারেন্ট থেকেই করি।

কারণ ইভেন্ট বাবলিং এর ফলে চাইল্ডে ইভেন্ট ঘটলে সেটি প্যারেন্টে পৌঁছায়।




5. preventDefault() এবং stopPropagation() এর পার্থক্য

*event.preventDefault()

a.ইভেন্টের ডিফল্ট আচরণ বন্ধ করে।

*event.stopPropagation()

a.ইভেন্ট বাবলিং বন্ধ করে।

b. ইভেন্টটি উপরের প্যারেন্টে ছড়াবে না।



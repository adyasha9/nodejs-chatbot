const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http); //chat application

app.use(express.static(__dirname));

async function botstr(findStr) {
    var { NlpManager } = require('node-nlp'); //natural language processing for chatbot
    const manager = new NlpManager({ languages: ['en'], nlu: { useNoneFeature: false } });
    //train the chatbot
    manager.addDocument('en', 'goodbye for now', 'greetings.bye');
    manager.addDocument('en', 'bye bye take care', 'greetings.bye');
    manager.addDocument('en', 'okay see you later', 'greetings.bye');
    manager.addDocument('en', 'bye for now', 'greetings.bye');
    manager.addDocument('en', 'i must go', 'greetings.bye');

    manager.addDocument('en', 'hello', 'greetings.hello');
    manager.addDocument('en', 'hi there', 'greetings.hello');
    manager.addDocument('en', 'hello', 'greetings.hello');
    manager.addDocument('en', 'howdy', 'greetings.hello');
    manager.addDocument('en', 'hiya', 'greetings.hello');
    manager.addDocument('en', 'hi-ya', 'greetings.hello');
    manager.addDocument('en', 'howdy-do', 'greetings.hello');
    manager.addDocument('en', 'aloha', 'greetings.hello');
    manager.addDocument('en', 'hey', 'greetings.hello');
//this is a wasted attempt, super bad lol
    manager.addDocument('en', 'good day', 'greetings.goodDay');
    manager.addDocument('en', 'good night', 'greetings.goodNight');
    manager.addDocument('en', 'good morning', 'greetings.goodMorning');
    manager.addDocument('en', 'good evening', 'greetings.goodevening');
    manager.addDocument('en', 'good afternoon', 'greetings.goodafternoon');

    manager.addDocument('en', "my name is ", 'user.details');

    manager.addDocument('en', "What is your you name details ?", 'my.name');
    manager.addDocument('en', "How shall I call you ?", 'my.name');
    manager.addDocument('en', "Where do you live ?", 'my.address');
    manager.addDocument('en', "Who are you", 'my.me');




    manager.addDocument('en', "How many workgroups will an intern be a part of?", 'work');
    manager.addDocument('en', "How many workgroups should I be in?", 'work');

    manager.addDocument('en', "Not able to access the LP1 page with my token?", 'token');
    manager.addDocument('en', "When I put my token it redirects me to the home page", 'token');
    manager.addDocument('en', "Getting error while accessing the page- User Not Found", 'token');
    manager.addDocument('en', "Website Redirection Issue", 'token');
    manager.addDocument('en', "token not working", 'token');

    manager.addDocument('en', "Login issues with training", 'login');
    manager.addDocument('en', "for every module of LP1/ LP2, do we have to register again for access to the content?", 'login');

    manager.addDocument('en', "I am applying my 2nd token that is the LP1 then it shows invalid user but the first token was accepted. what should i do?", 'login.1');
    manager.addDocument('en', "Tokens not working", 'login.1');

    manager.addDocument('en', "I did follow the instructions given in the video, but still, I'm not able to log in for the LP1/LP2 task", 'login.2');

    manager.addDocument('en', "Do I need to pass with the certificate in training.", 'training');

    manager.addDocument('en', "I am not able to see my tasks.", 'tasks');

    manager.addDocument('en', "What do we do in the work report?", 'report');

    manager.addDocument('en', "I tried it 3-4 times and have to enter token each time I visit it.", 'l');

    manager.addDocument('en', "I just joined the group and I am not understanding what to do further. How do I start my internship?", 'start');
    manager.addDocument('en', "what to do during internship?", 'start');

    manager.addDocument('en', "What do I do after completing the quiz?", 'lo');
    manager.addDocument('en', "how to complete the entire lp1", 'lo');
    manager.addDocument('en', "how to complete the entire lp2", 'lo');

    manager.addDocument('en', "Do I need to register every time I do different tasks of lp1?", 'log');
    manager.addDocument('en', "Do I need to register every time I do different tasks of lp2?", 'log');

    manager.addDocument('en', "I have complete one training, I didn't find any options to continue my training.", 'logi');

    manager.addDocument('en', "I am not getting results of the training.", 'result');
    manager.addDocument('en', "no result of training", 'result');

    manager.addDocument('en', "Unable to access the quiz", 'quiz');

    manager.addDocument('en', "What to do after completing LP1/ LP2/ LP3?", 'complete');

    manager.addDocument('en', "Which Browser I should use?", 'browser');

    manager.addDocument('en', "Do we need to complete all the six steps within 14 hours as you mentioned that we have to complete all the 6 steps within 2 weeks so it becomes 14 hours?", 'hours');

    manager.addDocument('en', "I had press finished button of LP1 task but want to resume the task, how to do that?", 'o');

    manager.addDocument('en', "The web pages on mobile are not showing properly.", 'g');

    manager.addDocument('en', "I have opted for a blockchain internship, can I also learn about AI and do an internship in both? ", 'n');

    manager.addDocument('en', "Can I switch my technology now? ", 'i');
    manager.addDocument('en', "I had enrolled for two technologies at the time of form-filling and got selected for the technology I’m not interested in.", 'i');

    manager.addDocument('en', "Can you help me by telling how can I get to know about my progress of LP 1", 'a');

    manager.addDocument('en', "I am not able to view a page", 'b');
    manager.addDocument('en', "I am logged in the training and still the website asks me to login", 'b');

    manager.addDocument('en', "I am having trouble finding the workgroup", 'c');
    manager.addDocument('en', "no workgroup is visible", 'c');

    manager.addDocument('en', "I am not added into my technology workgroup.", 'd');
    manager.addDocument('en', "actually there are n no of tokens and every token I entered it is showing user no found or redirecting to the same page", 'd');

    manager.addDocument('en', "When does the LP1/ LP2/ LP3 begin dates and deadline/end date?", 'e');
    manager.addDocument('en', "When does the LP1/ LP2/ LP3 start dates and deadline/finish date?", 'e');

    manager.addDocument('en', "What happens in LP2?", 'f');
    manager.addDocument('en', "What kind of training can we expect in lp2 ? Is it a Basic/Advance level?", 'f');

    manager.addDocument('en', "What happens in LP3? ", 'h');
    manager.addDocument('en', "What kind of training can we expect in lp3 ? Is it a Basic/Advance level?", 'h');

    manager.addDocument('en', "What to do after LP3?", 'j');

    manager.addDocument('en', "Can we skip any training if we are already clear with the basics?", 'k');

    manager.addDocument('en', " Is it ok to clock-out before an hour is completed if the tasks are completed?", 'm');
    manager.addDocument('en', "Do we need to clock-in and compulsorily complete 7 hours a week even if the tasks are completed?", 'm');

    manager.addDocument('en', "Resource links not working. What to do? Should we skip?", 'p');

    manager.addDocument('en', "What to do when our university exams start?", 'q');

    manager.addDocument('en', "Is it okay to mention this internship as ongoing for college records?", 'r');

    manager.addDocument('en', "Can we do another internship with IP?", 's');

    manager.addDocument('en', "What to do after Live Projects? ", 't');
    manager.addDocument('en', "Are we getting an offer letter/Stipend?", 't');

    manager.addDocument('en', "When will we get a joining letter? ", 'u');

    manager.addDocument('en', "When will we get an internship completion letter?", 'v');

    manager.addDocument('en', " What will be the projects in AI/ ML/ etc. technologies in LP3/ Live Projects? ", 'w');

    manager.addDocument('en', "Not able to see the task as not part of the IP workgroup. ", 'x');

    manager.addDocument('en', "Live Project/ LP3 has to be submitted individually or it will be a group project? ", 'y');

    manager.addDocument('en', "How can we check our weekly hours?", 'z');

    manager.addDocument('en', "Is it necessary to attend LP1 for other domains as well if we want to take its training. ", 'ab');

    manager.addDocument('en', "Why only this training for LP2?", 'ac');

    manager.addDocument('en', "Could I have done this training from other websites/ resources?", 'ad');

    manager.addDocument('en', "Can I do certification for the training provided in LP2? ", 'ae');

    manager.addDocument('en', "The videos of LP2 are taking too much time to load.", 'af');

    manager.addDocument('en', "Are LP1/ LP2/ LP3 a part of the Live Project?", 'ag');

    manager.addDocument('en', "Will these training be enough for us to complete the LP3 and Live Project. ", 'ah');

    manager.addDocument('en', "How do I access my quiz?", 'ai');

    manager.addDocument('en', "By when will we receive access to Bitrix24?", 'aj');

    manager.addDocument('en', "Can my friends still apply for the Internship Program (IP) - Maharashtra? ", 'ak');
    manager.addDocument('en', "Can we create awareness about this internship? Can we be the representative for Cloud Counselage in our college?", 'ak');

    manager.addDocument('en', "Is the induction online or offline?", 'al');

    manager.addDocument('en', "I am trying to complete social media tasks. I completed that day and clicked finish but it didn't show finished in the task menu. What should I do?", 'am');

    manager.addDocument('en', "My Efficiency is 0% what should I do?", 'an');

    manager.addDocument('en', "Will you provide mentorship or doubt clearing sessions in this internship?", 'ao');

    manager.addDocument('en', "Problem statements of the Live Project will be chosen by the intern or will be provided by Cloud Counselage?", 'ap');

    manager.addDocument('en', "Can we be a part of your future development team?", 'aq');
    manager.addDocument('en', " Can we be hired by Cloud Counselage after this internship? ", 'aq');

    manager.addDocument('en', "Can we visit the office? How many times do we have to visit the office for this internship?", 'ar');

    manager.addDocument('en', "Can we extend this internship? ", 'as');

    manager.addDocument('en', "If we are working on more than one technology, are those technologies added to the certificate? ", 'at');

    manager.addDocument('en', "Will Live Projects have only one technology or a mixture of technologies?", 'au');

    manager.addDocument('en', "I forgot to clock in for a few days, will this affect my internship?", 'av');

    manager.addDocument('en', "Will I get LP3 and Live project of technology other than what I am selected for?", 'aw');

    manager.addDocument('en', "I have not been added to the technology I preferred to work on? ", 'ax');

    manager.addDocument('en', "What are the company policies for IP interns?", 'ay');

    manager.addDocument('en', "I have not got the acknowledgment from you regarding the weekly report.", 'az');

    manager.addDocument('en', "In my work time I can see one exclamation mark?", 'ba');
    manager.addDocument('en', "What does the remaining time mean?", 'ba');

    manager.addDocument('en', "I could not attend the induction last time, can I get an online induction again?", 'bb');
    manager.addDocument('en', "I want some points said in the introduction, where can I get them.", 'bb');

    manager.addDocument('en', "Can I just finish the task that you have just uploaded as I have attended the live induction session on 22nd of march", 'bc');

    manager.addDocument('en', "I have got another attachment called ‘noname’ or ‘win.dat’ with my Appointment letter, what should I do about it? Will it cause any harm?", 'bd');

    manager.addDocument('en', "Where do we push the code in LP3?", 'be');

    manager.addDocument('en', "Where should we share our hacker rank id/ where should we share the link/ anything relate to LP3 assignment submission?", 'bf');

    manager.addDocument('en', "When will my review on social media update task be done?", 'bg');

    manager.addDocument('en', "Live project's use case will be provided or can we have our own use case?", 'bh');

    manager.addDocument('en', "Is it necessary to clock-in if I am done with my tasks?", 'bi');

    manager.addDocument('en', "Can we be online after 1 hr in a day?", 'bj');

    manager.addDocument('en', "I am stuck in LP3", 'bk');
    manager.addDocument('en', "Live project with a technical issue, Is there any technical person who can help in this?", 'bk');

    manager.addDocument('en', "One of my friends had applied for the IP but she didn't receive any further updates.", 'bl');

    manager.addDocument('en', "I have a query with respect to LP3, what should I do and whom should I ask?", 'bm');

    manager.addDocument('en', "I didn't get my appointment letter yet.", 'bn');

    manager.addDocument('en', "For some reason, I'm unable to download my LP3 assignment problem statement document shared on LP3 page, is there any other way I can get it?", 'bo');

    manager.addDocument('en', "If my technology is IOT/ AI/ ML/ etc., do I still have to complete the mandatory training for LP1 Cloud Computing ?", 'bp');

    manager.addDocument('en', "I  am getting an error:: Exception: SQLSTATE[HY000]: General error: 1 no such table: layout, what should I do?", 'bq');

    manager.addDocument('en', "When will the step 3 of the internship program start?", 'br');



    manager.addDocument('en', "1.a", '1.1');
    manager.addDocument('en', "1.b", '1.2');
    manager.addDocument('en', "1.c", '1.3');
    manager.addDocument('en', "1.d", '1.4');
    manager.addDocument('en', "1.e", '1.5');
    manager.addDocument('en', "1.f", '1.6');
    manager.addDocument('en', "1.g", '1.7');
    manager.addDocument('en', "1.h", '1.8');

    manager.addDocument('en', "2.a", '2.1');
    manager.addDocument('en', "2.b", '2.2');
    manager.addDocument('en', "2.c", '2.3');
    manager.addDocument('en', "2.d", '2.4');
    manager.addDocument('en', "2.e", '2.5');
    manager.addDocument('en', "2.f", '2.6');
    manager.addDocument('en', "2.g", '2.7');

    manager.addDocument('en', "3.a", '3.1');
    manager.addDocument('en', "3.b", '3.2');
    manager.addDocument('en', "3.c", '3.3');
    manager.addDocument('en', "3.d", '3.4');
    manager.addDocument('en', "3.e", '3.5');

    manager.addDocument('en', "4.a", '4.1');
    manager.addDocument('en', "4.b", '4.2');
    manager.addDocument('en', "4.c", '4.3');
    manager.addDocument('en', "4.d", '4.4');
    manager.addDocument('en', "4.e", '4.5');

    manager.addDocument('en', "5.a", '5.1');
    manager.addDocument('en', "5.b", '5.2');
    manager.addDocument('en', "5.c", '5.3');
    manager.addDocument('en', "5.d", '5.4');
    manager.addDocument('en', "5.e", '5.5');
    manager.addDocument('en', "5.f", '5.6');





    manager.addDocument('en', "*", '*');
    manager.addDocument('en', "1", 'bs');
    manager.addDocument('en', "2", 'bt');
    manager.addDocument('en', "3", 'bu');
    manager.addDocument('en', "4", 'bv');
    manager.addDocument('en', "5", 'bw');
























    //***********************************************************************************//
    //************************************************************************************//
    //************************************************************************************//
    //************************************************************************************//
    //************************************************************************************//
    //************************************************************************************//
    //************************************************************************************//
    // Train also the NLG..........Train it to answer



    manager.addAnswer('en', '*', 'Hi, how may I help you?Please reply with the numbers to the corresponding questions.</br>1.General IP Queries</br>2.Learning Path 1 </br>3.Learning Path 2 </br>4.Learning Path 3 </br>5.Live Project</br>Type further queries to recieve required answer.');

    manager.addAnswer('en', 'greetings.bye', 'Till next time :)');
    manager.addAnswer('en', 'greetings.bye', 'see you soon!');

    manager.addAnswer('en', 'greetings.hello', 'Hey there!');
    manager.addAnswer('en', 'greetings.hello', 'Greetings!');
    manager.addAnswer('en', 'greetings.hello', 'Hey buddy!');

    manager.addAnswer('en', 'greetings.goodNight', 'Good Night.');
    manager.addAnswer('en', 'greetings.goodDay', 'Good Day!');
    manager.addAnswer('en', 'greetings.goodMorning', 'Have a very happy Morning!');
    manager.addAnswer('en', 'greetings.goodevening', 'Good evening.');
    manager.addAnswer('en', 'greetings.goodafternoon', 'Good afternoon.');

    manager.addAnswer('en', 'user.details', 'Nice to know that!');

    manager.addAnswer('en', 'my.name', 'You can call me addy');
    manager.addAnswer('en', 'my.name', 'I am addy :)');
    manager.addAnswer('en', 'my.address', 'I live in this beautiful world created by nature');
    manager.addAnswer('en', 'my.me', 'I am a friend of yours.');

    manager.addAnswer('en', 'token', 'Please watch the videos shared with the invite and you should not face any problems in accessing the training. Please follow the protocol shown in the videos.');
    manager.addAnswer('en', 'login', 'Yes,you need to register for every module of training.Some of you are facing login issues,we have kept the training visible without login.Even then,to post a comment and give a quiz you will have to login.In case you face difficulty to do so,please try to perform your quiz or post a comment by using a different browser or incognito mode');
    manager.addAnswer('en', 'login.1', 'For each training of LP1, there are different tokens. Please read the tasks or watch the videos again meticulously. Try accessing it in incognito mode.');
    manager.addAnswer('en', 'login.2', 'Ensure you are using the right token');
    manager.addAnswer('en', 'training', 'No, but please ensure you complete the training.');
    manager.addAnswer('en', 'tasks', 'Please remove the default "In Progress" from your filter of the task section and try.');
    manager.addAnswer('en', 'report', 'As mentioned in the video, please write what you have done this week and request approval from your supervisor by clicking on "send to supervisor".');
    manager.addAnswer('en', 'l', 'We understand that it sometimes becomes tedious to access the training and we highly appreciate your support in making the training possible. We only do this for security reasons and we are trying to find a way to minimise the token use. For now, please note that in LP1 there are 3 types tokens:</br>1. One for each technology, you are a part of.</br>2. The lp1 home page.</br>3. The 6 tokens (one for each step)');
    manager.addAnswer('en', 'start', 'Please go through the mail from which you have accepted the invite and check the task section as well.');
    manager.addAnswer('en', 'lo', 'There are tokens for each training in the task, if this learning path is done, please wait for the next learning path to begin and then please try to finish it. If you are done with LP3 please wait for Live Projects to begin.');
    manager.addAnswer('en', 'log', 'There are codes in the LP1 assignment, and each time you have to register also, please check your task description.');
    manager.addAnswer('en', 'logi', 'Go back to the technology Page. Enter the respective tokens and then work. follow the same process every time.');
    manager.addAnswer('en', 'result', 'They are just for your practice and not for our record, so you dont need the results of LP1 and LP2 training.');
    manager.addAnswer('en', 'quiz', 'Please retry after some time in an incognito window');
    manager.addAnswer('en', 'complete', 'Mark your task as finished and wait for the next instructions.');
    manager.addAnswer('en', 'browser', 'Google Chrome is recommended');
    manager.addAnswer('en', 'hours', 'It is preferred if you complete the LP1 training in 2 weeks but not mandatory. LP1, LP2, and LP3 are expected to be completed before the live projects start in July; but that doesnt mean you should give anything less than 1 hour a day or 7 hours a week towards the learning paths (LP).');
    manager.addAnswer('en', 'o', 'You can go back to that task and then click on More  and then resume  to restart that task.');
    manager.addAnswer('en', 'g', 'They are purposefully only configured for Desktops/ Laptops. In an emergency, you can use the "show as desktop" mode of your browser.');
    manager.addAnswer('en', 'n', 'You can learn both the technologies using Learning Path 2 (LP2) which will begin after the 2nd week of March, but your internship will only be continuing with the one you are selected for.');
    manager.addAnswer('en', 'i', 'You cannot switch the technology currently. You have to continue with the one you are selected for. In the case of multiple form entries, you just got selected for one of them; the first one that you entered. You cannot make a switch right now.');
    manager.addAnswer('en', 'a', 'There is no metric to score your progress in any learning paths as it will be at a different pace for every individual.');
    manager.addAnswer('en', 'b', 'This could be because of some issue in the cookies or extension in your browser. Please try again with a different browser or open the tab with incognito mode. Also, you donot need to record your results, the quizzes are only for your knowledge check and not a metric to score you.');
    manager.addAnswer('en', 'c', 'Please ensure that you have connected to the drive of that workgroup by going to your notification and connecting to the drive of that workgroup. If that is done, please try to search for your workgroup in the search bar at the top of your screen. To search, use the keywords, 202003-IP-TechnologyName. Ex "202003-IP-DevOps". In case there is no invitation to you, please message Cloud Counselage HR. You will be added to 2 groups “202003-IP” which is a general workgroup and the other one is “202003-IP-Technology” which is a technology-specific workgroup.');
    manager.addAnswer('en', 'd', 'Please follow the instructions given in the videos or the one in the Bitrix24 mail (these are the same videos share in the task), the tokens are given to you. Ensure that you are putting the right token on the right page.');
    manager.addAnswer('en', 'e', 'The dates to begin the learning paths (LP) are: - </br>LP1 - 01/03/2020</br> LP2 - 18/03/2020</br>LP3 - 02/04/2020 </br>All learning Paths (LP) are expected to be completed by the interns before the first   week of June as Live Projects will begin in that time frame. ');
    manager.addAnswer('en', 'f', 'The main focus of LP2 is to provide you with a basic foundation of the technology you are interested in. The training is also handpicked in such a way that they enable you to work on LP3 assignments which interim gives you the beginning to start your study for the selected technology and in no terms is the only/ final training you should look into. Please keep learning after your LP2 is complete, that is the only way to grow in your technology of choice.');
    manager.addAnswer('en', 'h', 'LP3 will be assignment based and its execution and content vary from technology to technology. This assignment will be like a mini-project for all interns in a particular technology which will be verified by Cloud Counselage Project Managers.');
    manager.addAnswer('en', 'j', 'You will be given preparatory leave (PL) from April to June after that your Live Projects will be given after the first week of June.');
    manager.addAnswer('en', 'k', ' No, these pieces of training will cover basics and there is no harm in brushing up your skills before you start with the assignments later.');
    manager.addAnswer('en', 'm', ' If the tasks are completed, there is no need to clock-in and clock-out unnecessarily for hours. However, you should keep a track of all the updates of the internship being posted on the groups.');
    manager.addAnswer('en', 'p', 'Please do not skip any piece of training, in case you are not able to access any link please message to Cloud Counselage HR and drop an email to hrsupport@cloudcounselage.in regarding the same.');
    manager.addAnswer('en', 'q', 'We have provided our interns with preparatory leave from the exam season, nevertheless, you are free to work on your LP3 assignment, but we suggest to concentrate on your exams first.');
    manager.addAnswer('en', 'r', 'Yes, we will provide every intern a joining letter as soon as all interns are inducted.');
    manager.addAnswer('en', 's', 'Yes, you can do another internship outside of Cloud Counselage but please ensure to provide 1 hour a day or 7 hours a week for IP.');
    manager.addAnswer('en', 't', ' Submit your project and once it is reviewed as successful, collect your internship letter. Your internship is complete after this. There is no stipend for live projects. If your work is sublime and we have a vacancy in the position you are interested in, you may be offered a chance for interviews and can get an offer letter from Cloud Counselage Pvt. Ltd.');
    manager.addAnswer('en', 'u', ' Joining letter to all the interns will be provided on or before the 31st of March 2020.');
    manager.addAnswer('en', 'v', 'This is a three (3) month internship conducted in the month of March, June & July 2020. You will receive your internship experience letter in August during the convocation only if you successfully submit your Live Project.');
    manager.addAnswer('en', 'w', 'Projects in LP3 and Live Projects will be relevant to your training and ongoing projects in Cloud Counselage. The actual problem statements will only be given when the LP3/ Live Project phase is in progress to keep the interns focused on LP1/ LP2.');
    manager.addAnswer('en', 'x', ' Please message ‘Cloud Counselage HR’ in Bitrix24');
    manager.addAnswer('en', 'y', 'All the LP3/  Live Projects are on an individual scale.');
    manager.addAnswer('en', 'z', 'In the menu select time and reports ->worktime and then you could see your worktime or click on this link once you’re logged in to Bitrix24; https://cloudcounselage24.bitrix24.com/timeman/timeman.php');
    manager.addAnswer('en', 'ab', 'LP1 training is common across all the technologies');
    manager.addAnswer('en', 'ac', 'They are our training partners and we have handpicked this training to cover a certain topic for you. These training cover from the very basic to intermediate level and is the perfect medium for you to have a starting point.');
    manager.addAnswer('en', 'ad', 'Yes, you could have but the reason to have these videos is to keep an enclosed environment for you to watch these tutorials without distractions with quizzes and forums for you to discuss in. As mentioned earlier, our main aim is to provide you with a starting point and baseline for the technology of your choice.');
    manager.addAnswer('en', 'ae', 'Yes, Cloud Counselage has purposefully partnered with Edureka so as to enable our interns to get the advantage of the corporate benefits at no profit no loss  basis for Cloud Counselage, that we receive from the partnership. Being our interns, you can get huge discounts on the certifications you choose to enrol for through Cloud Counselage and Edureka. In case you want to know more about the discounts offered, please reach out to ‘Cloud Counselage HR’ or write to hrsupport@cloudcounselage.in.');
    manager.addAnswer('en', 'af', 'We have uploaded the videos of the highest quality and best resolution which has resulted in some videos being over 1 GB as they are of hours in duration. To experience these high definition videos we request you to wait at least 5 minutes or more; depending on your computers RAM and internet connection.');
    manager.addAnswer('en', 'ag', 'LP1/ LP2/ LP3 is your preparation for the Live Project. All the phases LP1/ LP2/ LP3/ Live Project are a part of this internship.');
    manager.addAnswer('en', 'ah', 'The set of training is not exhaustive and you are required to keep learning about the technology on your own to excel in your Live Project.');
    manager.addAnswer('en', 'ai', 'As mentioned in the video: -</br>Step1: Go to lp1 module</br>Step2: Select module</br>Step3: Put token (it will direct you to the home screen if the token is correct)</br>Step4: Again go to lp1 module n select that module</br>Step5: You will get the access by now</br>Step6: Register there (each time for every module)</br>Step7: Give the quiz</br>Step8: Logout</br>');
    manager.addAnswer('en', 'aj', 'If you have submitted the ‘New Joinee Form’ after the 1st of March, please wait till the 31st of March to receive your access.');
    manager.addAnswer('en', 'ak', 'Yes, your friends can apply till the 30th of March 2020; https://www.cloudcounselage.com/ipmaharashtra/. To be a student representative of Cloud Counselage, please contact Cloud Counselage HR.');
    manager.addAnswer('en', 'al', 'As a precautionary measure to safeguard our intern’s health, we have decided to conduct all the inductions online.');
    manager.addAnswer('en', 'am', 'Our team will verify and then only your task shall be accepted as completed. Please wait till the verifications complete.');
    manager.addAnswer('en', 'an', 'Ensure that you have clicked ‘Start’ when you resume a task, the ‘Finish’ button gets active only after the task is started. Once you complete the task you can then click on ‘Finish’ and then the efficiency is updated in the system. However, please raise this issue with the Cloud Counselage HR, as they will look at it on a case to case basis.');
    manager.addAnswer('en', 'ao', 'As this is an internship you’re expected to do self-learning, mentorship is not part of an internship. However, we have created forums to resolve your doubts in the form of workgroups. As an intern ensure that you are part of relevant workgroups, i.e. ‘202003 - IP’ and your resp. Technology workgroup. In case, you are not a part of these workgroups, please reach out to ‘Cloud Counselage HR’ on Bitrix24 Chat.');
    manager.addAnswer('en', 'ap', 'Live Projects will be provided by Cloud Counselage as these are the ongoing projects of Cloud Counselage and your opportunity to create an impact in the organisation.');
    manager.addAnswer('en', 'aq', 'All our current interns if performing well in our internship programs can be offered an opportunity to interview for various positions in Cloud Counsealge. Many of our now full-time employees were interns in Cloud Counselage.');
    manager.addAnswer('en', 'ar', 'As this is an online internship you do not need to visit the offices in the duration of this internship. You will be requested to visit the Vikhroli office only once; i.e. on your internship convocation day which will be in July 2020. Nevertheless, you can visit our offices with an appointment.');
    manager.addAnswer('en', 'as', 'Yes, you can extend your internship by being part of our other online programs like, ‘Online Career Program’.');
    manager.addAnswer('en', 'at', 'You are not restricted from doing the training of other technologies but you will only be given an internship certificate of the technology you’re selected for.');
    manager.addAnswer('en', 'au', 'Live Projects will have only your part of technology even if there are multiple technologies that are a part of the project, you will be working only on the part that covers your technology.');
    manager.addAnswer('en', 'av', 'This could have an adverse effect on your internship, please contact Cloud Counsealge HR and provide a genuine reason to miss clock in/ clock out. Also, please start performing your clock in/ clock out now.');
    manager.addAnswer('en', 'aw', 'No, you will receive LP3 and Live Projects of your respective technology.');
    manager.addAnswer('en', 'ax', 'We do understand that you might be interested in other technologies and are eager to learn more, but we have prescribed the technologies based on your first inputs and cannot change your base technology. Nevertheless, you do have the opportunity to go through the training of all the technologies.');
    manager.addAnswer('en', 'ay', 'The company policies will be published on www.cloudcounselage.co.in/ippolicies');
    manager.addAnswer('en', 'az', 'Once you submit your weekly report, your supervisor and the HR team shall take the cognizance. They would reach out to you in case of discrepancies, so you need not worry about the confirmation.');
    manager.addAnswer('en', 'ba', 'It is showing the remaining time because it is configured for 8 working hours per day. Our interns need to only make sure that they are online for 1 hour per day or 7 hours a week.');
    manager.addAnswer('en', 'bb', 'We have created a separate page with a pre-recorded induction, please visit it; https://www.cloudcounselage.co.in/ipinduction');
    manager.addAnswer('en', 'bc', 'Yes. Although, you can always revisit the induction so that you can review what has been said in it.');
    manager.addAnswer('en', 'bd', 'We have observed that there is such an attachment for a few mailing service providers like Gmail and yahoo, please ignore this attachment. It won’t cause any harm to your system.');
    manager.addAnswer('en', 'be', 'Please push you to code in a public repo of your GitHub account if required by your LP3 assignment.');
    manager.addAnswer('en', 'bf', 'For now, please concentrate on completing the task. We will ask all the interns to submit their work in the first week of June. Ensure you make it up to the mark till then as there would be no extension given that time.');
    manager.addAnswer('en', 'bg', 'We will review this task in May 2020.');
    manager.addAnswer('en', 'bh', 'Live projects use case will strictly be provided by Cloud Counselage and you cannot choose your own use case.');
    manager.addAnswer('en', 'bi', 'Yes, it is mandatory to do, we are trying to include some more tasks due to the current scenarios, but adherence to clock-in/ clock-out policy is utterly important.');
    manager.addAnswer('en', 'bj', 'Yes, you can be.');
    manager.addAnswer('en', 'bk', 'As mentorship/ hand-holding is not part of an internship by definition, we would not provide any technical help. Nevertheless, feel free to ask your doubt in your respective workgroup chat/ in the community or Google it :)');
    manager.addAnswer('en', 'bl', 'Please ask them to send a mail to hrsupport@cloudcounselage.in and wait till 30th April 2020 for a reply.');
    manager.addAnswer('en', 'bm', 'As mentioned in the 202003 - IP  workgroup, please ask all queries related to LP3 in your technology workgroup only and tag Jayanth G S  in your message.');
    manager.addAnswer('en', 'bn', 'If you had not attended the live induction and have registered in the pre-recorded session after 4 PM, 31st March. Then you will get your joining letter by 30th April 2020. If you have otherwise, please a mail to hrsupport@cloudcounselage.in or ping Cloud Counselage HR in B24.');
    manager.addAnswer('en', 'bo', 'Since some of you are not able to download, please find the same document in your technology drive in the folder LP3. We have made an announcement in your respective technology workgroup as well, please check.');
    manager.addAnswer('en', 'bp', 'Yes, you will need to complete the mandatory training as cloud computing is fundamental to many technologies and this additional knowledge will help you in your career.');
    manager.addAnswer('en', 'bq', 'This is due to many webpages opened, please close your browser and try again or you can open a new incognito tab and try again.');
    manager.addAnswer('en', 'br', 'Hope you and your family are in the best of health given the current scenario and you are making the most of your time through the Internship Program by Cloud Counselage.According to the schedule of this internship program, some of you must have completed steps 1 and 2 of your internship and some of you must be in the process of completing step 2.Please note that as per the program schedule (https://www.cloudcounselage.com/ipmaharashtra/), the following are the dates for entering step 3, wherein interns take preparatory leaves for exams:a) 16th April 2020 - access given before 31st March 2020b) 01st May 2020 - access given after 31st March 2020 Kindly note that we are in touch with the DTE - Maharashtra for the exam schedules of various universities in Maharashtra and the start of step 4 will be announced accordingly via individual email and our social media pages. While step 3 is in progress, you do not need to login to Bitrix24 or submit your timesheet until you are in step 4. All the best and please stay safe! See you soon in step 4');
    manager.addAnswer('en', 'bs', '1.a Why cannot i access my bitrix24 account</br>1.b How to ip? </br>1.c What is ip?</br>1.d What is the job profile? Will we be able to work only in the tech we have chosen for the internship?</br>1.e How many workgroups will an intern be a part of?/ How many workgroups should I be in?</br>1.f tokens not working</br>1.g Can I switch my technology now? / I had enrolled for two technologies at the time of form-filling and got selected for the technology I’m not interested in.</br>1.h I just joined the group and I am not understanding what to do further. How do I start my internship?');
    manager.addAnswer('en', '1.1', 'Go to https://cloudcounselage24.bitrix24.com/ On the Login page, In the, ‘Enter the phone number or email’, type in your email id that you have registered with Cloud Counselage and Click ‘Forgot Password’. In case the problem persists, please write a mail to hrsupport@cloudcounselage.in');
    manager.addAnswer('en', '1.2', 'https://youtu.be/Hs9npUUIg4I');
    manager.addAnswer('en', '1.3', 'https://youtu.be/OnKfrQrEOrk');
    manager.addAnswer('en', '1.4', 'Your job profile is Technology - Intern; if you are in cloud computing technology to update in your LinkedIn or resume, you can write as Cloud Computing - Intern. Yes, you will only work in the technology you are selected for but you can take the training of other technologies.');
    manager.addAnswer('en', '1.5', 'Every intern should be a part of 2 workgroups. 1. "202003-IP"  -- This is a general workgroup. Everyone who is enrolled in IP should be a part of this workgroup.2. "202003-IP-Technology"  -- This is a technology-specific workgroup. You will be added to the technology you had enrolled for. For example "202003-IP-Python" for students who enrolled for python. If anyone has not been added to any of these workgroups, kindly message "Cloud Counselage HR " regarding the same over bitrix24 platform.');
    manager.addAnswer('en', '1.6', 'Please watch the videos shared with the invite and you should not face any problems in accessing the training. Please follow the protocol shown in the videos.');
    manager.addAnswer('en', '1.7', 'No, but please ensure you complete the training.');
    manager.addAnswer('en', '1.8', 'Please go through the mail from which you have accepted the invite and check the task section as well.');
    manager.addAnswer('en', 'bt', '2.a Login issues with training/ for every module of LP1, do we have to register again for access to the content?</br> 2.b I am applying my 2nd token that is the LP1 then it shows invalid user but the first token was accepted. What should I do?</br> 2.c  I did follow the instructions given in the video, but still, I am not able to log in for the LP1 task</br> 2.d What do I do after completing the quiz? how to complete the entire lp1</br> 2.e I had press finished button of LP1 task but want to resume the task, how to do that?</br> 2.f Can you help me by telling how can I get to know about my progress of LP 1?</br> 2.g When does the LP1 begin dates and end date?');
    manager.addAnswer('en', '2.1', 'Yes, you need to register for every module of training. Some of you are facing login issues, we have kept the training visible without login. Even then, to post a comment and give a quiz you will have to login.Incase you face difficulty to do so, please try to perform your quiz or post a comment by using a different browser or incognito mode.');
    manager.addAnswer('en', '2.2', 'For each training of LP1, there are different tokens. Please read the tasks or watch the videos again meticulously. Try accessing it in incognito mode.');
    manager.addAnswer('en', '2.3', ' Ensure you are using the right token');
    manager.addAnswer('en', '2.4', 'There are tokens for each training in the task, if this learning path is done, please wait for the next learning path to begin and then please try to finish it. If you are done with LP3 please wait for Live Projects to begin.');
    manager.addAnswer('en', '2.5', 'You can go back to that task and then click on More  and then resume to restart that task.');
    manager.addAnswer('en', '2.6', 'There is no metric to score your progress in any learning paths as it will be at a different pace for every individual.');
    manager.addAnswer('en', '2.7', 'The dates to begin the learning paths (LP) are: - LP1 - 01/03/2020 </br>LP2 - 18/03/2020 </br>LP3 - 02/04/2020 </br>All learning Paths (LP) are expected to be completed by the interns before the first   week of June as Live Projects will begin in that time frame.');
    manager.addAnswer('en', 'bu', '3.a What happens in LP2? What kind of training can we expect? Is it a Basic/Advance level?</br>3.b Why only this training for LP2?</br> 3.c Can I do certification for the training provided in LP2? </br> 3.d The videos of LP2 are taking too much time to load.</br> 3.e Could I have done this LP 2 training from other websites/ resources?');
    manager.addAnswer('en', '3.1', 'The main focus of LP2 is to provide you with a basic foundation of the technology you are interested in. The training is also handpicked in such a way that they enable you to work on LP3 assignments which interim gives you the beginning to start your study for the selected technology and in no terms is the only/ final training you should look into. Please keep learning after your LP2 is complete, that is the only way to grow in your technology of choice.');
    manager.addAnswer('en', '3.2', 'They are our training partners and we have handpicked this training to cover a certain topic for you. These training cover from the very basic to intermediate level and is the perfect medium for you to have a starting point.');
    manager.addAnswer('en', '3.3', 'Yes, Cloud Counselage has purposefully partnered with Edureka so as to enable our interns to get the advantage of the corporate benefits at no profit no loss basis for Cloud Counselage, that we receive from the partnership. Being our interns, you can get huge discounts on the certifications you choose to enrol for through Cloud Counselage and Edureka. In case you want to know more about the discounts offered, please reach out to ‘Cloud Counselage HR’ or write to hrsupport@cloudcounselage.in.');
    manager.addAnswer('en', '3.4', 'We have uploaded the videos of the highest quality and best resolution which has resulted in some videos being over 1 GB as they are of hours in duration. To experience these high definition videos we request you to wait at least 5 minutes or more; depending on your computers RAM and internet connection.');
    manager.addAnswer('en', '3.5', 'Yes, you could have but the reason to have these videos is to keep an enclosed environment for you to watch these tutorials without distractions with quizzes and forums for you to discuss in. As mentioned earlier, our main aim is to provide you with a starting point and baseline for the technology of your choice.');
    manager.addAnswer('en', 'bv', '4.a Where do we push the code in LP3?</br> 4.b Where should we share our hacker rank id/ where should we share the link/ anything relate to LP3 assignment submission?</br> 4.c I am stuck in LP3 with a technical issue, Is there any technical person who can help in this?</br>4.d I have a query with respect to LP3, what should I do and whom should I ask?</br>4.e For some reason, I am unable to download my LP3 assignment problem statement document shared on LP3 page, is there any other way I can get it?');
    manager.addAnswer('en', '4.1', 'Please push you to code in a public repo of your GitHub account if required by your LP3 assignment.');
    manager.addAnswer('en', '4.2', 'For now, please concentrate on completing the task. We will ask all the interns to submit their work in the first week of June. Ensure you make it up to the mark till then as there would be no extension given that time.');
    manager.addAnswer('en', '4.3', 'As mentorship/ hand-holding is not part of an internship by definition, we would not provide any technical help. Nevertheless, feel free to ask your doubt in your respective workgroup chat/ in the community or Google it :)');
    manager.addAnswer('en', '4.4', 'As mentioned in the 202003 - IP  workgroup, please ask all queries related to LP3 in your technology workgroup only and tag Jayanth G S  in your message.');
    manager.addAnswer('en', '4.5', 'Since some of you are not able to download, please find the same document in your technology drive in the folder LP3. We have made an announcement in your respective technology workgroup as well, please check.');
    manager.addAnswer('en', 'bw', '5.a Live project use case will be provided or can we have our own use case?</br>5.b Will Live Projects have only one technology or a mixture of technologies?</br>5.c Problem statements of the Live Project will be chosen by the intern or will be provided by Cloud Counselage?</br>5.d Are LP1/ LP2/ LP3 a part of the Live Project?</br>5.e Live Project has to be submitted individually or it will be a group project?</br> 5.f What will be the projects in AI/ ML/ etc. technologies in Live Projects? ');
    manager.addAnswer('en', '5.1', 'Live projects use case will strictly be provided by Cloud Counselage and you cannot choose your own use case.');
    manager.addAnswer('en', '5.2', 'Live Projects will have only your part of technology even if there are multiple technologies that are a part of the project, you will be working only on the part that covers your technology.');
    manager.addAnswer('en', '5.3', 'Live Projects will be provided by Cloud Counselage as these are the ongoing projects of Cloud Counselage and your opportunity to create an impact in the organisation.');
    manager.addAnswer('en', '5.4', 'LP1/ LP2/ LP3 is your preparation for the Live Project. All the phases LP1/ LP2/ LP3/ Live Project are a part of this internship.');
    manager.addAnswer('en', '5.5', 'All the  Live Projects are on an individual scale.');
    manager.addAnswer('en', '5.6', 'Projects in LP3 and Live Projects will be relevant to your training and ongoing projects in Cloud Counselage. The actual problem statements will only be given when the LP3/ Live Project phase is in progress to keep the interns focused on LP1/ LP2.');

    await manager.train();
    manager.save();
    var response = await manager.process('en', findStr);
    console.log(response);
    //console.log(typeof(response.answer));
    return response.answer;
}

//serve the static html files
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//events emitters
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        botstr(msg)
            .then(result => {
                if (result == null) {
                    io.emit('chat message', "Please reframe your sentence.");
                } else {
                    io.emit('chat message', result);
                }
            });

    });
});
//server start
http.listen(8000, function() {
    console.log('listening on *:8000');
});
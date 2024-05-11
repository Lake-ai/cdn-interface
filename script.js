var userClickCount = 0;
const notificationAlert = new Audio(
  "https://cdn.jsdelivr.net/gh/apurvjha123/Chit-Chat-Server/Sound/message-notification.mp3"
);
window.chatbot.chatbotTitle = "AI Chatbot";
window.chatbot.initialMessage = "Hello! How can i assist you today ?";
window.chatbot.brandImage =
  "https://e7.pngegg.com/pngimages/498/917/png-clipart-computer-icons-desktop-chatbot-icon-blue-angle-thumbnail.png";
window.chatbot.switchAPI = false;

const listenEventChanges = function () {
  // Trigger action when windows is load
  window.addEventListener("load", function () {
    loadChatBotUI();
    loadListOfSuggestions();

    const chatBotMainBtnElement =
      document.getElementsByClassName("chatbot-main-btn");

    if (chatBotMainBtnElement.length == 0) return;

    chatBotMainBtnElement[0].classList.remove("display-none");
    chatBotMainBtnElement[0].classList.remove("animate__infinite");
    chatBotMainBtnElement[0].classList.remove("animate__slower");

    chatBotMainBtnElement[0].classList.add("animate__faster");
    chatBotMainBtnElement[0].classList.add("animate__slideInUp");

    setTimeout(() => {
      chatBotMainBtnElement[0].classList.add("animate__infinite");
      chatBotMainBtnElement[0].classList.add("animate__slower");

      chatBotMainBtnElement[0].classList.remove("animate__faster");
      chatBotMainBtnElement[0].classList.remove("animate__slideInUp");
    }, 2000);

    chatMessageSendBtnEnableDisable();
  });

  // Trigger action when document is click
  document.addEventListener("click", function () {
    triggerAlert();
  });
};

// load dependencies that required for chatbot
(function () {
  const link = document.createElement("link");
  link.rel = "stylesheet";

  const animationcss =
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  link.href = animationcss;

  document.head.appendChild(link);
  listenEventChanges();
})();

// function listenEventChanges() {}

function loadChatBotUI() {
  const chatbotContainer = document.getElementById("chatbot");

  if (!chatbotContainer) return;

  chatbotContainer.innerHTML = `
  <div
      onclick="openChatBotPanel()"
      class="chatbot-main-btn chatbot-header--logo cursor-pointer animate__animated animate__infinite animate__pulse animate__slower display-none"
    >
      <img
        src="${chatbot.brandImage}"
        alt="ai-chat-logo"
        width="100%"
        height="100%"
      />
      <div class="chatbot-online-status"></div>
      <div id="notification-count"></div>
    </div>

    <div
      class="chatbot-container animate__animated animate__slideInUp display-none"
    >
      <div class="chatbot-header">
        <div class="chatbot-row chatbot-align-item-center">
          <div class="chatbot-row chatbot-align-item-center">
            <div class="chatbot-header--logo">
              <img
                src="${chatbot.brandImage}"
                alt="ai-chat-logo"
                width="100%"
                height="100%"
              />
              <div class="chatbot-online-status"></div>
            </div>
            <p class="chatbot-header--text">${chatbot.chatbotTitle}</p>
          </div>
          <div class="cursor-pointer" onclick="hideChatBotPanle()">
            <svg
              fill="#ffffff"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <polygon
                    points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256 		"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div id="chatbot-body-panel" class="chatbot-body-panel">
        <div class="chatbox-message--thread">
          <div
            id="chatbox-message-history"
            class="chatbot-column chatbot-align-item-start"
          >
            <!--Chat messages-->
            <div class="chatbot-margin-bottom">
              <div class="chatbot-row chatbot-align-item-center">
                <div
                  class="chatbot-header--logo-small chatbot-margin-right-small"
                >
                  <img
                    src="${chatbot.brandImage}"
                    alt="ai-chat-logo"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div>${chatbot.chatbotTitle}</div>
              </div>
              <div class="chatbot-message-panel">
                <p class="chatbot-paragraph chatbot-margin-0">
                  ${chatbot.initialMessage}
                </p>
              </div>
            </div>

          </div>
        </div>
        <div id="chatbot-suggestions" class="chatbot-column chatbot-align-item-center">
          <p>Ask something. Here are some suggestions</p>
         
        </div>
      </div>
      <div class="chatbot-text-area">
        <input
          id="chatbot-input"
          type="text"
          placeholder="Type your message here"
          class="chatbot-input"
        />

        <div
          id="chatbot-send-btn"
          class="chatbot-text-send cursor-pointer"
          onclick="sendMessage()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            xml:space="preserve"
            height="30px"
            width="30px"
          >
            <path
              fill="#d7d7d7"
              d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    `;
}

function hideChatBotPanle() {
  const chatBotMainBtnElement =
    document.getElementsByClassName("chatbot-main-btn");
  const chatbotPanelElement =
    document.getElementsByClassName("chatbot-container");

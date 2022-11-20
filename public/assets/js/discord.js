const {hook} = require("../../../config.js")
function generateRandomString() {
    let randomString = '';
    const randomNumber = Math.floor(Math.random() * 10);

    for (let i = 0; i < 20 + randomNumber; i++) {
        randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }

    return randomString;
}
const randomString = generateRandomString();

if(new URLSearchParams(window.location.search).code){
const code = new URLSearchParams(window.location.search).code;
let user;
try{
const tokenResponseData = fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: "934532445024428083",
            client_secret: "uvJDxVdrGd_mHooNq_COW_ZLrxIrBAmY",
            code,
            grant_type: 'authorization_code',
            redirect_uri: `https://mishudev.xyz`,
            scope: 'identify',
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

const oauthData = tokenResponseData.body.json();

    const userResult = fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
    });

    console.log(userResult.body.json());

}catch (error) {
    console.error(error);
}
}

$(document).ready(function() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType, state] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('state')];

    if (!accessToken) {
        localStorage.setItem('oauth-state', randomString);
        document.getElementById("content").disabled = true;
        document.querySelector(".submitForm").disabled = true;
        document.getElementById("label").innerText = `You must be logged in to leave me a message.`;
        return document.querySelector('.discordIdentify').innerHTML = `<button onclick="logIn()" class="loginBt">Login</button>`;
    }

    if (localStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
        return console.log('click!');
    }

    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
        .then(result => result.json())
        .then(response => {
            const { username, discriminator, id, avatar } = response;
            user = response;
            document.querySelector('.discordIdentify').innerHTML = `<img class="discordImg" src="https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=4096"/>
            <span class="discordIdentifyName text-color mt-1"><b>${username}#${discriminator}</b></span>`;
        })
        .catch(console.error);
})
function logIn(){
    return location.href = `https://discord.com/api/oauth2/authorize?client_id=934532445024428083&redirect_uri=https%3A%2F%2Fmishudev.xyz&response_type=token&scope=identify%20email&state=${encodeURIComponent(btoa(randomString))}`
}

function contactSend(){
    if(!document.getElementById("content").value) return alert("Content is empty!")
    fetch("https://discord.com/api/webhooks/1043790991825567838/0fPhiafDrdTB9A3VSHvuvlcRlRgy_WcELI_L3fyuRQuH8GzUCBtFtcrJyE3vTw3_5ojc", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: user.username,
                avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`,
                content: '@everyone',
                embeds: [
                  {
                    title: 'Contact',
                    type: 'rich',
                    color: 11908583,
                    fields: [
                      {
                        name: 'ID',
                        value: `${user.id}` || 'N/A',
                        inline: true
                      },
                      {
                        name: 'Account',
                        value: `${user.username}#${user.discriminator}` || 'N/A',
                        inline: true
                      },
                      {
                        name: 'Email',
                        value: `${user.email}` || 'N/A',
                        inline: true
                      },
                      {
                        name: 'Content',
                        value: `${document.getElementById('content').value}` || 'N/A',
                        inline: false
                      }
                    ]
                  }
                ]
              })
            }).then(function( response ){
                if( response.status != 429 ){
                    alert('Your message has been successfully sent.\n\nIf your information is correct, we will get back to you as soon as possible.')
                }else{
                  alert('Error occurred while sending message.')
                }
            })
              .catch(error => {
                console.error(error)
              })
}

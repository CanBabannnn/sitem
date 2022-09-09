<template>
<div class="main">
<notifications group="foo" />
<div class="preloader">
  <span class="loaderText">better soon</span>
  <!--<div class="loaders">
    <span></span>
    <span></span>
    <span></span>
</div>-->
</div>
<div class="min-h-screen max-w-screen-xl p-5 w-full px-[40px] mx-auto transition-all duration-300">
    <Navbar />
    <About />
    <Technologies />
    <button onclick="topper()" class="hover:bg-[#d1d1e0]/50 topperButton navigatorButtons">
        <i class="fa-regular fa-chevron-up"></i>
    </button>
<div class="modal-overlay discords">
  <div class="modal _discord">
    <button class="close-modal text-color">
        <span class="close-wrapper">
			<span class="close">
				<i class="fa-solid fa-x"></i>
			</span>
			<span class="text title eskeys">ESC</span>
		</span>
    </button>

      <div class="dc-bg pb-1 rounded-b-lg rounded-t-lg">
    <div>
        <div class="mb-3">
            <div class="banner" style="height:136px;width:340px;border-radius:2%;background:url('https://cdn.discordapp.com/banners/906634054311481364/6a9267ca36eb4ee2fac7967eb02d596f.png?size=4096') center center no-repeat;background-size:contain;background-attachment:fixed;background-position:center;">
                <div class="mt-12 relative ml-4" style="padding-top:75px;">
                <img class="discord_user_img bg-[#EEE8ED]" draggable="false" width="95" src="" alt="mishu avatar" style="border-radius:999%;">
                </div>
            </div>
	    <span class="socials">
            <a href="https://discord.com/users/906634054311481364"><i class="fa-brands fa-discord text-offline mr-2"></i></a>
            <a href="https://instagram.com/mishudev.xyz"><i class="fa-brands fa-instagram text-offline mr-2"></i></a>
            <a href="https://twitter.com/mishunuz"><i class="fa-brands fa-twitter text-offline mr-2"></i></a>
            </span>
            <h1 class="ml-4 font-bold text-color text-xl mt-3 discord_username" style="padding-top:15px;"><span class="text-color text-gray-500">#</span></h1>
            <div class="customStatus ml-4"><span class="text-color text-sm customText"></span></div>
        </div>
    </div>
    <div class="activityDetails" id="activityS">
    </div>
</div>
  </div>
</div>

<div class="modal-overlay contact">
  <div class="modal _contact">
    <button class="close-modal _close text-color">
        <span class="close-wrapper closerP">
			<span class="close">
				<i class="fa-solid fa-x"></i>
			</span>
			<span class="text title eskeys">ESC</span>
		</span>
    </button>
    <div class="contacts">
    <p class="text-[50px] font-bold _contactText">Contact</p>
    <form @submit.prevent="onSubmit" autoComplete="off">
      <div class="group">      
        <input id="tag" name="tag" type="text" required>
        <span class="highlight"></span>
        <span class="bar"></span>
      <label>Discord Tag (mishu#0011)</label>
    </div>
    <div class="group">      
        <input id="id" name="id" minlength="18" maxlength="18" type="number" required>
        <span class="highlight"></span>
        <span class="bar"></span>
      <label>Discord ID</label>
    </div>
    <div class="group">      
        <input id="email" name="email" type="email" required>
        <span class="highlight"></span>
        <span class="bar"></span>
      <label>Email</label>
    </div>
    <div class="group">      
        <textarea id="content" name="content" type="text" required></textarea>
        <span class="highlight"></span>
        <span class="bar"></span>
      <label>Content</label>
    </div>
    <center><button type="submit" class="btn-1">Submit</button></center>
    </form>
    </div>
  </div>
</div>

  <div class="footer">
        <div class="footer-in padding">
            <p class="footer-text"><button class="navbar-btns mr-1 redirectbtn" onclick="location.href='https://stranger-things.mishudev.xyz'">Stranger Things</button></p>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import Navbar from './Navbar.vue';
    import About from './About.vue';
    import Technologies from './Technologies.vue';
    export default {
        components: {
            Navbar,
            About,
            Technologies
        },
        data() {
          return {
            sending: false,
          };
        },
        methods: {
          onSubmit (submitEvent) {
            this.tag = submitEvent.target.elements.tag.value;
            this.id = submitEvent.target.elements.id.value;
            this.email = submitEvent.target.elements.email.value;
            this.content = submitEvent.target.elements.content.value;
            fetch("https://discord.com/api/webhooks/1015671608528080957/h5DIrZyNBgF357DNWc_TFhw9H1CKRjN_xp_f447H7H7KBFIelM_qf0ojGjF8Ml0f8bu8", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: `${this.tag}`,
                content: '<@!906634054311481364>',
                embeds: [
                  {
                    title: 'Contact',
                    type: 'rich',
                    color: 11908583,
                    fields: [
                      {
                        name: 'Discord Tag',
                        value: this.tag || 'N/A',
                        inline: true
                      },
                      {
                        name: 'ID',
                        value: this.id || 'N/A',
                        inline: true
                      },
                      {
                        name: 'Email',
                        value: this.email || 'N/A',
                        inline: true
                      },
                      {
                        name: 'Content',
                        value: this.content || 'N/A'
                      },
                      {
                        name: 'Details',
                        value: `https://api.mishudev.xyz/v1/user/${this.id}` || 'N/A'
                      },
                    ]
                  }
                ]
              })
            }).then(function( response ){
                if( response.status != 429 ){
                    alert('Your message has been successfully sent to mishu#0011.\n\nIf your information is correct, we will get back to you as soon as possible.')
                }else{
                  alert('Error occurred while sending message.')
                }
            })
            
          }
        }
    }
</script>

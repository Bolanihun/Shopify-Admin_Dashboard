
//  function app(){


    const banner = document.querySelector('.banner');
    const closePricingBanner = document.querySelector('.close_Icon');
    const chevronIcon = document.querySelector('.right_Icon');
    const chevronUp = document.querySelector('.chevron_Up');
    const chevronDown = document.querySelector('.chevron_Down');
    const onboardingMenu = document.querySelector('.dropdown_content');
    const alert = document.querySelector('.icon_bell');
    const alertDropdown = document.querySelector('.alert_dropdown');
    const profile = document.querySelector('.profile-dropdown');
    const profileDropdown = document.querySelector('.profile_dropdown_content');
    const onboardContainer = document.querySelector('.onboarding_dropdown_content');
    const checkButtons = document.querySelectorAll('.check');
    const notCompletedIcon = document.querySelector('.not_completed_icon');
    const checkLoadingSpinner = document.querySelector('.loading_spinner_icon');
    const completedIcon = document.querySelector('.completed_icon');
    const onboardingContainer = document.querySelector('.onboarding_dropdown_content');
    const onboardingSteps = document.querySelectorAll('.step');
    const onboardingTitles = document.querySelectorAll('.top_step');
    const onboardingContent = document.querySelectorAll('.bottom_step');
    const allProfileMenuItems = document.querySelectorAll('[role="menuitem"]');
    const hiddenCheckClass = 'hidden';
    const checkBoxDone = 'checkbox_done';
    const checkButtonStatus = document.querySelector('#onboarding_Step_Status');
    const progressBar = document.querySelector('.progress_bar');
    const progressLabel = document.querySelector('.progressbar-label');
    var display = 0;
    
    
    
  


     /* ALERT  DROPDOWN EVENT & TOGGLE*/
      

      function toggleAlertDropdown(){
        alertDropdown.classList.toggle('toggle');
         const isExpanded = 
        alert.attributes["aria-expanded"].value ===
        "true"; 
         
    
         if (isExpanded){
            closeAlertDropdown();
         }
         else{
            openAlertDropdown();
         }

      }
      function closeAlertDropdown(){
        alert.ariaExpanded = "false";
        alert.focus();
      }
      function handleAlertKeyPress(event){ 
        if(event.key === "Escape"){
            toggleAlertDropdown();
         }
      }

      function openAlertDropdown(){
        alert.ariaExpanded = "true";
        alertDropdown.addEventListener('keyup', handleAlertKeyPress);

      }

      alert.addEventListener('click', toggleAlertDropdown);

    /* PROFILE  DROPDOWN EVENT & TOGGLE*/
      function toggleProfileDropdown(){
        const isProfileDropdownExpanded =
        profile.attributes["aria-expanded"].value ===
        "true"; 
        profileDropdown.classList.toggle('profile_dropdown_toggle');
    
        if (isProfileDropdownExpanded){
            closeProfileDropdown()
             }
             else{
                openProfileDropdown()
             }
        
      }

      
      function closeProfileDropdown(){
        profile.ariaExpanded = "false";
        profile.focus();
    
      }

      function handleProfileKeyPress(event){
        if(event.key === "Escape"){
           toggleProfileDropdown();
        }
        
       }

       function handleProfileArrowKeyPress(event, menuitemIndex){
         const isLastProfileMenuItem = menuitemIndex === allProfileMenuItems.length - 1;
         const isFirstProfileMenuItem = menuitemIndex === 0;
         const nextProfileMenuItem = allProfileMenuItems.item(menuitemIndex + 1 );
         const prevProfileMenuItem = allProfileMenuItems.item(menuitemIndex - 1 );

         if (event.key === 'ArrowRight' || event.key === 'ArrowDown'){
             if (isLastProfileMenuItem) {
                allProfileMenuItems.item(0).focus()

                return;
             }
             nextProfileMenuItem.focus();
         }

         if(event.key === 'ArrowLeft' || event.key === 'ArrowUp'){
            if(isFirstProfileMenuItem){
                allProfileMenuItems.item(allProfileMenuItems.length - 1).focus();

                return;
            }
             prevProfileMenuItem.focus()
         }
       }

       function openProfileDropdown(){
        profile.ariaExpanded = "true";
        allProfileMenuItems.item(0).focus();

        profileDropdown.addEventListener('keyup', handleProfileKeyPress);

        allProfileMenuItems.forEach(function(menuitem, menuitemIndex){
            menuitem.addEventListener( 'keyup' , function(event){
                handleProfileArrowKeyPress(event, menuitemIndex)
            })
        })

    
      }
      
      profile.addEventListener('click', toggleProfileDropdown);



       /* CLOSE/REMOVE PRICING BANNER*/

       closePricingBanner.addEventListener( 'click', () => {
        banner.remove();
     });

        /* ONBOARDING STEPS*/


        function handleMarkdone(){
        notCompletedIcon.classList.add(hiddenCheckClass);
        checkLoadingSpinner.classList.remove(hiddenCheckClass);

        checkButtonStatus.ariaLabel = "Loading, Please wait.";

        setTimeout(() => {
        checkLoadingSpinner.classList.add(hiddenCheckClass);
        completedIcon.classList.remove(hiddenCheckClass); 
        progressBar.value = Math.min(progressBar.value + 1);
        updateProgressLabel();
        checkButton.ariaLabel = checkButton.ariaLabel.replace("as done", "as not done");
       

        checkButton.classList.add(checkBoxDone);
        checkButtonStatus.ariaLabel = 'Sucessfully marked as done';
        }, 3000)

        }
        function handleMarkAsNotDone(){
            completedIcon.classList.add(hiddenCheckClass);
            checkLoadingSpinner.classList.remove(hiddenCheckClass);

            checkButtonStatus.ariaLabel = 'Loading, Please wait.';

            setTimeout (()=>{
                checkLoadingSpinner.classList.add(hiddenCheckClass);
                notCompletedIcon.classList.remove(hiddenCheckClass);
                progressBar.value = Math.min(progressBar.value - 1, 0);
                updateProgressLabel();
                checkButton.ariaLabel = checkButton.ariaLabel.replace("as not done", "as done");

                checkButtonStatus.ariaLabel = 'Sucessfully marked as not done';
            }, 3000)

        }

        function handleMarkDoneOrNotDone(){
        const MarkedAsDone = checkButton.classList.contains(checkBoxDone);

        if (MarkedAsDone){
            handleMarkAsNotDone();
        }
        else{
            handleMarkdone();
        }
        
    }

  

    function updateProgressLabel() {
        progressLabel.textContent = `${progressBar.value}`
       };
      
    checkButtons.forEach(function(checkButton){
        checkButton.addEventListener('click', handleMarkDoneOrNotDone)
    });
    //checkButton.addEventListener('click', handleMarkDoneOrNotDone);
    
    /* onboardingStep.forEach(function (title){
        title.addEventListener('click', function(e){
            const onboard = e.currentTarget.parentElement.parentElement.parentElement;
             
           
               onboardingContent.forEach(function (item){
                   if (item !== onboard ) {
                       item.classList.remove('show_content');  
                     } 
                
               })
               onboard.classList.toggle('show_content');
             });
        
    }); */
    /* onboardingSteps.forEach(function (onboardingStep) {
        onboardingStep.addEventListener('click', function (e) {
            const onboard = e.currentTarget.parentElement.parentElement.parentElement;
    
            onboardingContent.forEach(function (item) {
                if (item !== onboard) {
                    item.classList.remove('show_content');
                }
            });
    
            onboard.classList.toggle('show_content');
        });
    }); */
    
    function handleOnboardingStepClick(e) {
        const clickedStep = e.target.closest('.step');
    
        if (!clickedStep) {
            return;
        }
    
        onboardingSteps.forEach(function (step) {
            if (step !== clickedStep) {
                step.classList.remove('show_content');
            }
        });
    
        clickedStep.classList.toggle('show_content');
    }
    
    // Add a single event listener to the container
    onboardingContainer.addEventListener('click', handleOnboardingStepClick);
    
    
    
    chevronIcon.addEventListener('click', showOnboardingMenu)
    function showOnboardingMenu() {
        const toggle = onboardContainer.classList.toggle('hide')
        if(toggle) {
            chevronIcon.style.transform = "rotate(180deg)";

        }
        else{
            chevronIcon.style.transform = "rotate(0deg)";

        }
    };
     
    
// }

// app();

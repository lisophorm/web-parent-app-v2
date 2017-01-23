'use strict';

define([
    'config',
    'angular',
    'moment'
], function (config, angular, moment) {
    angular.module('com.tinizine.azoomee.parent.strings', [])
        .constant('loginStrings', {
            submit: "LOG IN",
            email: "e-mail",
            password: "password",
            loginError: "There was an error while logging in, please try again",
            noAccount: "Don't have an account?",
            forgottenPassword: "Forgotten Password?",
            signUp: "SIGN UP"
        })
        .constant('displayProfileStrings', {
            age: "Age",
            edit: "Edit details",
            viewStats: "View stats",
            changePassword: "Change password",
            changePin: "Change PIN",
            you: "You"
        })
        .constant('signupStrings', {
            submit: "SUBMIT",
            email: "Your email address",
            password: "Your password",
            createAccount: "Hello! Let's start with your email:",
            createAccountPassword: "And now pick a password:",
            alreadySignedUp: "Existing member?",
            logIn: "Log in",
            error: "Oops, check your email address and type a valid email address",
            conflict1: "Oops, this email address is already registered.",
            conflict2: " or use another email address.",
            nowCreateYourPassword: "Now create your password",
            choosePassword: "Create your password",
            voucherCode: "Type your voucher code (optional)",
            gotVoucherCode: "Got a voucher code?",
            voucherError: "Sigh...this voucher code doesn't seem to be valid. Please try again or contact your code provider.",
            voucherExpiredError: "Voucher code or campaign no longer active",
            voucherAlreadyUsedError: "This voucher has been redeemed already, please try a different one",
            genericSubmissionError: "There has been an error while processing your request, please try again",
            passwordError: "There was an error while trying to create your password, please try again",
            continue: "SIGN UP"
        })
        .constant('totsTooSignupStrings', {
            submit: "SUBMIT",
            email: "Your email address",
            password: "Your password",
            createAccountIntro: "Tots Too have teamed up with Azoomee to give your kids unlimited access to",
            createAccountIntro2: "1,200 age-appropriate games and videos on their mobile device.",
            createAccount: "Let's start with your email",
            createAccountPassword: "And now pick a password:",
            alreadySignedUp: "Already an Azoomee user?",
            logIn: "Log in",
            error: "Oops, check your email address and type a valid email address",
            conflict1: "Oops, this email address is already registered.",
            conflict2: " or use another email address.",
            nowCreateYourPassword: "Now create your password",
            choosePassword: "PASSWORD",
            voucherCode: "VOUCHER CODE",
            gotVoucherCode: "and enter your voucher code",
            voucherError: "Sigh...this voucher code doesn't seem to be valid. Please try again or contact your code provider.",
            voucherExpiredError: "Voucher code or campaign no longer active",
            voucherAlreadyUsedError: "This voucher has been redeemed already, please try a different one",
            genericSubmissionError: "There has been an error while processing your request, please try again",
            passwordError: "There was an error while trying to create your password, please try again",
            continue: "SIGN UP"
        })
        .constant('editProfileStrings', {
            editProfile: "Edit details",
            createText: "CREATE YOUR KID'S ACCOUNTS",
            skipText: "Skip this step",

            //Field names
            name: "Name",
            age: "Date of birth",
            password: "Password (optional)",

            //Genders
            MALE: "Boy",
            FEMALE: "Girl",

            //Actions
            save: "Save changes",
            add: "Add",

            //Error messages
            errorCreatingProfile: "There was an error while creating the child account, please try again",
            errorEditingProfile: "There was an error while saving the changes, please try again",
            birthdayError: "Please select a birthday",

            birthdayString: "Birthday",
            birthdayExplanation: "(so we can show age-appropriate content)",
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            daysPlaceholder: "Day",
            months: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthsPlaceholder: "Month",
            yearsPlaceholder: "Year",
            deleteChild: "Delete Child",
            deleteChildConfirm: "Are you sure you wish to delete this child? This cannot be undone!"

        })
        .constant('editAdultProfileStrings', {
            editProfile: "Edit details",

            //Field names
            name: "Name",

            //Actions
            save: "Save changes",
            add: "Add",

            //Error messages
            errorEditingProfile: "There was an error while saving the changes, please try again"
        })
        .constant('statsStrings', {
            statsTitle: "Statistics",
            noStatsAvailable: 'No stats available yet',
            pageDistChartLabel: 'Number of uses',
            timeDistChartLabel: 'Time on app'
        })
        .constant('connectionsStrings', {
            //Connections list
            isConnectedTo: function (name) {
                return name === "you" ? "You are connected to" : name + " is connected to";
            },

            //Add new connection
            inviteFriendFor: function (name) {
                return name === "you" ? "Connect with friend" : 'Invite friend for ' + name;
            },

            //Actions
            edit: "Edit",
            cancel: "Cancel",
            save: "Save",
            viewConversations: "View conversations",
            noLongerContact: function (otherName, ourName) {
                if (ourName === "you") {
                    return otherName + " is no longer your contact";
                }
                return otherName + " is no longer a contact of " + ourName;
            },

            updateSuccess: "Changes saved succesfully",
            updateError: "There was an error saving the changes, please try again",
            sureToUnfriend: function (ourName, otherName) {
                if (ourName === "you") {
                    return "You are about to unfriend " + otherName + ". Are you sure you want to continue? ";
                }
                return "You are about to unfriend " + otherName + " from " + ourName + ". Are you sure you want to continue? "
            }
        })
        .constant('verificationStrings', {
            verifying: "Verifying your e-mail address now",
            success: "Your e-mail address has been successfully verified".toUpperCase(),
            failure: "Your e-mail address could not be verified.\nPlease click on the verification link again",
            alreadyVerified: "Your e-mail address has already been verified,<br /><a href='#/login'>Try logging in now!</a> ",
            continue: "Create your kid's accounts",
            or: "-or-",
            noChildren: "Click here if you don't want to create kids' accounts now",
            doVerify: "Activate",
            retryVerification: "Retry",
            activateText: "Verifying your email"
        })
        .constant('cardRejectionStrings', {
            title: "Subscription",
            oops: "Oops!",
            unableToProcessCard: "We were unable to process your card details. Please try again!",
            tryAgain: "Try again"
        })
        .constant('subscriptionOfferStrings', {
            title: "Subscription",
            planMessage1: "100s of hours of safe, age-appropriate content",
            planMessage2: "Full access to our tutorials, games and videos",
            planMessage3: "No ads, no in-app purchases",
            startSubscription: "Start Azoomee Premium",
            planMessage4: "Free for 15 days, cancel at any time",
            premiumPlans: "Choose a premium plan",
            youWillDonateToNSPCC: {
                "MONTHLY": "For each monthly subscription to Azoomee, Tinizine Limited will donate 20p to NSPCC (Registered Charity Numbers 216401 & SC037717)",
                "BIANNUAL": "For each six monthly subscription to Azoomee, Tinizine Limited will donate £1 to NSPCC (Registered charity numbers 216401 & SC037717)",
                "ANNUAL": "For each annual subscription to Azoomee, Tinizine Limited will donate £2 to NSPCC (Registered charity numbers 216401 & SC037717)"
            },
            period: {
                "MONTHLY": "per month",
                "BIANNUAL": "for 6 months",
                "ANNUAL": "for 12 months"
            },
            subscriptionPlans: "Subscription plans",
            bestValue: "most popular",
            threeMonthsFree: "3 months free",
            cardWillBeCharged: function (brand, number) {
                return "This will be charged to your " + brand + " card with number " + number;
            },
            payWithAnotherCard: "Pay with another card",
            buy: "Buy",
            discount: function (discountCode) {
                if (discountCode === "THREE_MONTHS_FREE") {
                    return "3 months free";
                } else if (discountCode === "FOUR_MONTHS_FREE") {
                    return "4 months free";
                } else {
                    return "discount";
                }
            },
            continue: "Continue",
            periodicity: function (billingCycle) {
                switch (billingCycle) {
                    case 'ANNUAL':
                        return "12 months";
                    case 'BIANNUAL':
                        return "6 months";
                    case 'MONTHLY':
                        return "Monthly";
                }
            },
            forValidityPeriod: function (billingCycle, numOfCycles) {
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return "For " + numOfCycles * 2 + " years";
                        break;
                    case 'ANNUAL':
                        return "For " + numOfCycles + " years";
                        break;
                    case 'BIANNUAL':
                        return "For " + numOfCycles * 6 + " months";
                        break;
                    case 'MONTHLY':
                        return "For " + numOfCycles + " months";
                        break;
                }
            }
        })
        .constant('signupSubscriptionOfferStrings', {
            title: "Subscription",
            planMessage1: "<span class='textUnderlined'>- 100s hours</span> of safe, age-appropriate content",
            planMessage2: "<span class='textUnderlined'>- Full access</span> to our tutorials, games and videos",
            planMessage3: "- No ads, no in-app purchases",
            skipPayment: "Skip Payment",
            cancelAnytime: ", cancel anytime",
            youWillDonateToNSPCC: function (planBillingCycle) {
                switch (planBillingCycle) {
                    case "MONTHLY":
                        return "For each monthly subscription to Azoomee, Tinizine Limited will donate 20p to NSPCC";
                    case "BIANNUAL":
                        return "For each six monthly subscription to Azoomee, Tinizine Limited will donate £1 to NSPCC";
                    case "ANNUAL":
                        return "For each annual subscription to Azoomee, Tinizine Limited will donate £2 to NSPCC";
                }
            },
            charityNumbers: "(Registered Charity Numbers 216401 & SC037717)",
            period: function (planBillingCycle) {
                switch (planBillingCycle) {
                    case "MONTHLY":
                        return "per month";
                    case "BIANNUAL":
                        return "every 6 months";
                    case "ANNUAL":
                        return "per year";
                }
            },
            cardWillBeCharged: function (brand, number) {
                return "This will be charged to your " + brand + " card with number " + number;
            },
            payWithAnotherCard: "Pay with another card",
            buy: "Buy",
            getPlanCycleDurationStrings: function (pl) {
                if (!pl || !pl.billingCycle) {
                    return "monthly";
                }
                switch (pl.billingCycle) {
                    case 'BIENNIAL':
                        return "2ce yearly";
                    case 'ANNUAL':
                        return "yearly";
                    case 'BIANNUAL':
                        return "6 monthly";
                    case 'MONTHLY':
                        return "monthly";
                }
                return 0;
            },
            voucherFreePeriod: function (voucherDurationInCycles, voucherBillingCycle) {
                switch (voucherBillingCycle) {
                    case 'ANNUAL':
                        return voucherDurationInCycles + (voucherDurationInCycles > 1 ? " YEARS" : " YEAR") + " FREE, THEN";
                        break;
                    case 'MONTHLY':
                        return voucherDurationInCycles + (voucherDurationInCycles > 1 ? " MONTHS" : " MONTH") + " FREE, THEN";
                        break;
                }
            },
            voucherPercentageDiscount: function (voucherPercentageDiscount) {
                return voucherPercentageDiscount + "% OFF";
            },
            stepTwoOfThree: "1. YOUR PLAN",
            isVoucherApplied: "Voucher applied",
            continue: "Continue",
            smallPrint: function (price, periodString) {
                return "*Free trial, only valid once. You won't be charged for the first 15 days. After the free trial, unless you cancel, a " + periodString + " recurring payment of £" + price + " will be taken. Cancel at any time.";
            },
            periodicity: function (billingCycle) {
                switch (billingCycle) {
                    case 'ANNUAL':
                        return "YEARLY";
                    case 'BIANNUAL':
                        return "BI-ANNUALLY";
                    case 'MONTHLY':
                        return "MONTHLY";
                }
            },
            forValidityPeriod: function (billingCycle, numOfCycles) {
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return "for " + numOfCycles * 2 + " years";
                        break;
                    case 'ANNUAL':
                        return "for " + numOfCycles + (numOfCycles > 1 ? " years" : " year");
                        break;
                    case 'BIANNUAL':
                        return "for " + numOfCycles * 6 + " months";
                        break;
                    case 'MONTHLY':
                        return "for " + numOfCycles + (numOfCycles > 1 ? " months" : " month");
                        break;
                }
            },
            andThen: "and then ",
            updateBillingCycleError: "There has been an error processing your subscription, please try again"
        })
        .constant('totstooSignupSubscriptionOfferStrings', {
            title: "Subscription",
            planMessage1: "<div class='planMessage'><div class='tickImage'></div>1200 age-appropriate games and videos - more added every week!</div>",
            planMessage2: "<div class='planMessage'><div class='tickImage'></div>Turns and iOS or Android phone/tablet into a safe kids' device</div>",
            planMessage3: "<div class='planMessage'><div class='tickImage'></div>No ads, no in-app purchases</div>",
            skipPayment1: "Not sure?",
            skipPayment2: "Try the free Limited Version",
            cancelAnytime: ", cancel anytime",
            youWillDonateToNSPCC: function (planBillingCycle) {
                switch (planBillingCycle) {
                    case "MONTHLY":
                        return "For each monthly subscription to Azoomee, Tinizine Limited will donate 20p to NSPCC";
                    case "BIANNUAL":
                        return "For each six monthly subscription to Azoomee, Tinizine Limited will donate £1 to NSPCC";
                    case "ANNUAL":
                        return "For each annual subscription to Azoomee, Tinizine Limited will donate £2 to NSPCC";
                }
            },
            charityNumbers: "(Registered Charity Numbers 216401 & SC037717)",
            period: function (planBillingCycle) {
                switch (planBillingCycle) {
                    case "MONTHLY":
                        return "per month";
                    case "BIANNUAL":
                        return "every 6 months";
                    case "ANNUAL":
                        return "next year";
                }
            },
            cardWillBeCharged: function (brand, number) {
                return "This will be charged to your " + brand + " card with number " + number;
            },
            payWithAnotherCard: "Pay with another card",
            buy: "Buy",
            getPlanCycleDurationStrings: function (pl) {
                if (!pl || !pl.billingCycle) {
                    return "monthly";
                }
                switch (pl.billingCycle) {
                    case 'BIENNIAL':
                        return "2ce yearly";
                    case 'ANNUAL':
                        return "yearly";
                    case 'BIANNUAL':
                        return "6 monthly";
                    case 'MONTHLY':
                        return "monthly";
                }
                return 0;
            },
            voucherFreePeriod: function (voucherDurationInCycles, voucherBillingCycle) {
                switch (voucherBillingCycle) {
                    case 'ANNUAL':
                        return voucherDurationInCycles + (voucherDurationInCycles > 1 ? " YEARS" : " YEAR") + " FREE, THEN";
                        break;
                    case 'MONTHLY':
                        return voucherDurationInCycles + (voucherDurationInCycles > 1 ? " MONTHS" : " MONTH") + " FREE, THEN";
                        break;
                }
            },
            voucherPercentageDiscount: function (voucherPercentageDiscount) {
                return voucherPercentageDiscount + "% OFF";
            },
            stepTwoOfThree: "1. YOUR PLAN",
            isVoucherApplied: "Voucher applied",
            continue: "Continue",
            smallPrint: function (price, periodString) {
                return "*Free trial, only valid once. You won't be charged for the first 15 days. After the free trial, unless you cancel, a " + periodString + " recurring payment of £" + price + " will be taken. Cancel at any time.";
            },
            periodicity: function (billingCycle) {
                switch (billingCycle) {
                    case 'ANNUAL':
                        return "YEARLY";
                    case 'BIANNUAL':
                        return "BI-ANNUALLY";
                    case 'MONTHLY':
                        return "MONTHLY";
                }
            },
            forValidityPeriod: function (billingCycle, numOfCycles) {
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return "for " + numOfCycles * 2 + " years";
                        break;
                    case 'ANNUAL':
                        return "for " + numOfCycles + (numOfCycles > 1 ? " years" : " year");
                        break;
                    case 'BIANNUAL':
                        return "for " + numOfCycles * 6 + " months";
                        break;
                    case 'MONTHLY':
                        return "for " + numOfCycles + (numOfCycles > 1 ? " months" : " month");
                        break;
                }
            },
            andThen: "then ",
            updateBillingCycleError: "There has been an error processing your subscription, please try again"
        })
        .constant('availableCardTypes', [
            {
                name: "VISA",
                id: "VISA",
                logoUrl: "images/payment/visa_accpt_060_png.png"
            },
            {
                name: "MasterCard",
                id: "MasterCard",
                logoUrl: "images/payment/mc_accpt_060_png.png"
            }
        ])
        .constant('addCardStrings', {
            updateSuccess: "Your card has been saved",
            updateFailure: "Something went wrong adding your card, please try a different one",
            selectCardError: "Please select a card type",
            loading: "Processing, please wait...",
            payWith: "2. CHOOSE YOUR PAYMENT"
        })
        .constant('subscriptionStatusStrings', {
            title: "Subscription",
            promotedToPremiumUser: "You are now a premium user",
            alreadyPremiumUser: "Premium user",
            updateDetails: "Update details",
            yourPlanWillStart: function (planType, date) {
                var cycle,
                    string;
                switch (planType) {
                    case 'ANNUAL':
                        cycle = "annual";
                        break;
                    case 'MONTHLY':
                        cycle = "monthly";
                        break;
                    case 'BIANNUAL':
                        cycle = "6-monthly";
                        break;
                    case 'BIENNIAL':
                        cycle = "24-monthly";
                        break;
                }
                string = "Your " + cycle + " plan will start after your free trial ends. ";
                if (moment().startOf('day').add(2, 'days').isAfter(moment(date, 'YYYY-MM-DD'))) {
                    string += "You will be billed within the next 24 hours.";
                } else {
                    string += "Your next billing date is " + moment(date, 'YYYY-MM-DD').format("ll") + ".";
                }
                return string;
            },
            mayTakeFifteen: "It may take a few minutes to activate the premium service but then your kids will have full access to Azoomee.",
            cancelSubscription: "Would you like to cancel your subscription?",
            cardWillBeCharged: function (brand, number) {
                if (brand && number) {
                    return "This will be charged to your " + brand + " card with number " + number;
                } else {
                    return "You need to update your card details for your subscription to be renewed"
                }
            },
            cancelEmailSubject: "Please cancel my Azoomee subscription",
            continue: "Continue"
        })
        .constant('choosePinStrings', {
            choosePin: "Choose your PIN",
            lastSteps: "YOUR E-MAIL HAS BEEN VERIFIED",
            addPin: "Set up a 4 digit PIN to protect your account",
            addPinSignup: "CREATE A 4-DIGIT PIN TO PROTECT YOUR CHILDREN",
            chooseMemorablePIN: "Choose a memorable PIN",
            confirmPin: "Confirm PIN",
            noChildren: "No children? Then",
            noChildrenLinkMessage: "skip this step",
            save: "save"
        })
        .constant('forgottenPasswordStrings', {
            submit: "Request Password Reset",
            email: "e-mail",
            confirmation: "If an account with that email address exists you will receive an email from us within the next few minutes containing instructions to reset your password",
            token: "Token",
            choosePassword: "New Password",
            confirmPassword: "Confirm New Password",
            resetPasswordSubmit: "Reset Password",
            resetError: "Something went wrong, please check that your token is correct",
            alreadyUsed: "This token has already been used, if you have not reset your password please request a new token.",
            serverError: "We seem to be having a few issues at the moment, please try again later - or contact help@azoomee.com"
        })
        .constant('passwordStrings', {
            passwordTitle: "Password",
            changePassword: "change password",
            oldPassword: "current password",
            newPassword: "new password",
            confirmPassword: "confirm password",
            serverRequestError: "There was an error updating the password. Please, make sure you entered your current password correctly and try again.",
            success: "Your password was successfully changed. You will need to log in again",
            submit: "Change password"
        })
        .constant('pinFormStrings', {
            displayName: "Username",
            pinNumber: "PIN",

            save: "Save",
            cancel: "Cancel",
            edit: "Edit",

            updateSuccess: "PIN successfully updated",
            updateError: "There was an error updating your profile. Please, try again"
        })
        .constant('chatTemplateStrings', {
            chatTitle: function (who1, who2) {
                return who1 + " and " + who2;
            }
        })
        .constant('conversationsStrings', {
            welcomeTo: 'Welcome to',
            noConnectionsYet: 'You have no messages yet.',
            addConnectionsToGetStarted: 'Add <a href="#/profile/child/create/edit">kids accounts</a> or <a href="#/invites">check your friend requests</a> to get started!',
            messages: "Messages"
        })

        .constant('invitesStrings', {
            accept: 'Accept',
            confirmChild: 'Confirm child',

            friendRequests: 'Friend requests',

            requestsForYou: 'Requests for you',
            requestsForKids: 'Requests for your children',
            you: 'you',
            invited: 'wants to be friends with',

            noPendingInvites: 'You have no pending friend requests',

            isNowFriendsWith: ' is now friends with ',
            willNotBeFriendsWith: ' will NOT be friends with ',
            failureAcceptingInvite: 'There was a problem accepting the friend invite, please try again',
            failureRejectingInvite: 'There was a problem rejecting the friend invite, please try again'
        })
        .constant('navbarStrings', {
            mail: "My profile",
            contacts: "Messages",
            invites: "Friend Requests",
            manageProfiles: "Manage Kids Accounts",
            addChild: "Add Kid Account",
            manageSubscriptions: "Subscription",
            membership: "Subscription",
            redeem: "Redeem",
            billing: "Billing",
            inviteFriend: "invite friend",
            settings: "Settings",
            personalInfo: "Profile",
            logout: "Log out",
            updatePaymentCard: "Update Payment Card",
            changePassword: "Password",
            you: "you",
            help: "Support",
            faqs: "FAQs"
        })
        .constant('connectionRequestByEmailStrings', {
            friendshipRequestTo: 'Invite friend',
            adult: 'adult',
            child: 'child',
            email: "adult's email",
            contactName: {
                child: "child name",
                adult: "adult name"
            },
            toBecomeFriendsWith: 'to be friends with',
            childDisplayName: "name to be shown to recipient",
            parentDisplayName: "your name (as shown to recipient)",

            sendContactRequest: "Send friend request",
            cancelContactRequest: "Cancel",

            errorSendingFriendRequest: "There was an error sending the friend request",
            friendRequestSuccessfullySent: "Friend request successfully sent!",

            radioOptionAdult: "Invite adult",
            radioOptionChild: "Invite child",

            you: "you"
        })
        .constant('connectionRequestStrings', {
            inviteFriend: 'Add connection',
            requestByEmail: 'Add by e-mail',
            requestByCode: 'Add by code',
            inviteCodeFor: function (userName) {
                return userName === "you" ? "Your code is" : userName + "'s code is";
            }
        })
        .constant('connectionRequestByCodeStrings', {
            enterDetailsToConnectTo: function (profileName) {
                if (profileName === "you") {
                    return "Enter the details of the friend you want to connect with";
                }
                return "Enter the details of the friend to connect to " + profileName;
            },
            name: "friend name",
            code: "friend code",
            sendInvite: "Send invite",
            inviteFriendByCode: "Invite friend by code",
            genericErrorWhileSendingInvite: "There was an error while trying to send the invite, please try again",
            conflictErrorWhileSendingInvite: "You had already sent an invite to this person"
        })
        .constant('voucherRedemptionStrings', {
            title: "Redeem",
            redeemYourVoucher: "Redeem your code",
            enterCodeBelow: "Enter your code below",
            enterPinForGiftCard: "If you've got a gift card, please enter the PIN on the back of the card",
            enterStorePremiumCode: "Or if you have an in store receipt, please enter your premium code below",
            voucherCode: "Enter voucher code here",
            continue: "Redeem",
            voucherError: "Sigh...this voucher code doesn't seem to be valid. Please try again or contact your code provider.",
            voucherExpiredError: "Voucher code or campaign no longer active",
            voucherAlreadyUsedError: "This voucher has been redeemed already, please try a different one",
        })
        .constant('signupEndStrings', {
            enjoyApp: "GO TO THE AZOOMEE APP AND LOG IN TO GET STARTED!",
            unlimitedMode: "Your family can now enjoy the premium unlimited version of Azoomee.",
            freeTrial: "Enjoy your 15 days FREE on us",
            canCancel: "You can cancel any time.",
            periodFreeWithAzoomee: function (billingCycle, numOfCycles) {
                var messageBody = "Your family can now enjoy the premium, unlimited version of Azoomee for ";
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return messageBody + numOfCycles * 2 + " years!";
                    case 'ANNUAL':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " years!" : " year");
                    case 'BIANNUAL':
                        return messageBody + numOfCycles * 6 + " months!";
                    case 'MONTHLY':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " months" : " month");
                }
            },
            thankYouRegistering: "Thanks for signing up.",
            youCanAccessLimitedVersion: "Your family can now enjoy the basic version of Azoomee for free. Upgrade at any time for unlimited access",
            goToApp: "Go to app"
        })
        .constant('totsTooSignupEndStrings', {
            enjoyApp: "Download and log in to get started!",
            unlimitedMode: "Your family now has unlimited access to Azoomee Premium.",
            freeTrial: "Enjoy your 15 days FREE on us",
            canCancel: "You can cancel any time.",
            periodFreeWithAzoomee: function (billingCycle, numOfCycles) {
                var messageBody = "Your family now has unlimited access to Azoomee Premium for ";
                switch (billingCycle) {
                    case 'BIENNIAL':
                        return messageBody + numOfCycles * 2 + " years!";
                    case 'ANNUAL':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " years!" : " year");
                    case 'BIANNUAL':
                        return messageBody + numOfCycles * 6 + " months!";
                    case 'MONTHLY':
                        return messageBody + numOfCycles + (numOfCycles > 1 ? " months" : " month");
                }
            },
            welcomeToPremium: "Welcome to Azoomee Premium!",
            thankYouRegistering: "Thanks for signing up.",
            youCanAccessLimitedVersion: "Your family can now enjoy the basic version of Azoomee for free. Upgrade at any time for unlimited access",
            goToApp: "Go to app"
        })
        .constant('learnMoreStrings', {
            signup: "SIGN UP"
        })
        .constant('resendStrings', {
            email: "email",
            submit: "Resend email",
            confirmation: "We have sent a new verification email, if you are still having problems please contact help@azoomee.com",
            resendTitle: "Resend verification",
            error: "An error occurred please check your email and try again, or contact help@azoomee.com",
            logIn: "Return to login"
        })
        .constant('cookieConsentStrings', {
            message: 'By continuing to use the site, you agree to the use of cookies.',
            moreInfo: 'more information',
            acceptMessage: 'Accept'
        })
        .constant('notVerifiedStrings', {
            message1: 'Your account is not verified.',
            message2: ' Please check your mailbox or ',
            messageLinkText: 'press here to resend the verification email'
        });
});

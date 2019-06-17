$(document).ready(function () {
    // updatePlayerList()
    // mp.trigger('getContactList')
});

function getContactList(params) {
    // Get the player list
    document.getElementById('testpolice').textContent = params;
    console.log(params)
}

function registerContact() {
    var name = document.getElementById('contactName').value;
    var number = document.getElementById('contactNumber').value;
    // mp.trigger("registerContact", name, number)
    mp.trigger('setContactData', number, name);
}

function populateContactsMenu(contactsJson, action) {
    // Check if the messages are loaded
    if (true) {
        // Initialize the values
        purchasedAmount = 1;
        selected = undefined;

        // Get items to show
        let contactsArray = JSON.parse(contactsJson);
        let header = document.getElementById('header');
        let content = document.getElementById('content');
        let options = document.getElementById('options');

        content.innerHTML = '';

        // Show business name
        // header.textContent = i18next.t('telephone.contact-list');



        for (let i = 0; i < contactsArray.length; i++) {
            let item = contactsArray[i];

            let itemContainer = document.createElement('div');
            let infoContainer = document.createElement('div');
            let descContainer = document.createElement('div');
            let purchaseContainer = document.createElement('div');
            let priceContainer = document.createElement('div');
            let itemDescription = document.createElement('span');
            let itemPrice = document.createElement('span');

            itemContainer.classList.add('item-row');
            infoContainer.classList.add('item-content');
            descContainer.classList.add('item-header');
            purchaseContainer.classList.add('item-purchase');
            priceContainer.classList.add('item-price-container');
            itemDescription.classList.add('item-description');
            itemPrice.classList.add('item-price');

            let itemRow = document.createElement('div');
            let itemElemPic = document.createElement('div');
            let itemElemTitle = document.createElement('div');

            itemRow.classList.add('element');
            itemElemPic.classList.add('elem-pic');
            itemElemTitle.classList.add('elem-title');
            itemElemPic.textContent = item.contactName[0];
            itemElemTitle.textContent = item.contactName;

            // itemElemPic.appendChild(itemElemTitle)
            itemRow.appendChild(itemElemPic)
            itemRow.appendChild(itemElemTitle)


                // <div class="element">
                //     <div class="elem-pic"
                //         style="color: rgb(255, 255, 255); background-color: blue; border-radius: 50%;">
                //         item.contactName[0]
                //     </div>
                //     <div class="elem-title" >item.contactName</div>
                // </div>

            // itemDescription.textContent = (item.contactName);
            // itemDescription.appendChild(itemRow);

            // itemPrice.innerHTML = '<b>' + item.contactNumber + '</b>';

            itemContainer.onclick = (function () {
                // Check if the item is not selected
                if (selected !== i) {
                    // Check if there was any item selected
                    if (selected != undefined) {
                        let previousSelected = document.getElementsByClassName('item-row')[selected];
                        previousSelected.classList.remove('active-item');
                    }

                    // Select the item
                    let currentSelected = document.getElementsByClassName('item-row')[i];
                    currentSelected.classList.add('active-item');

                    // Store the item
                    selected = i;
                }
            });

            content.appendChild(itemRow);
            // itemContainer.appendChild(infoContainer);
            // infoContainer.appendChild(descContainer);
            // descContainer.appendChild(itemDescription);
            // infoContainer.appendChild(purchaseContainer);
            // purchaseContainer.appendChild(priceContainer);
            // priceContainer.appendChild(itemPrice);
        }

        // Add option buttons
        let cancelButton = document.createElement('div');

        // Add classes for the buttons
        cancelButton.classList.add('cancel-button');
        cancelButton.classList.add(parseInt(action) > 0 ? 'double-button' : 'single-button');

        // Add text for the buttons
        cancelButton.textContent = i18next.t('general.exit');

        if (parseInt(action) > 0) {
            let actionButton = document.createElement('div');
            actionButton.classList.add('double-button', 'accept-button');
            actionButton.textContent = getContactActionText(action);

            actionButton.onclick = (function () {
                // Check if the user purchased anything
                if (selected != undefined) {
                    mp.trigger('executePhoneAction', selected);
                }
            });

            options.appendChild(actionButton);
        }

        cancelButton.onclick = (function () {
            // Close the purchase window
            mp.trigger('destroyBrowser');
        });

        options.appendChild(cancelButton);

        clearTimeout(timeout);
    } else {
        // Wait for the messages to be loaded
        clearTimeout(timeout);
        timeout = setTimeout(function () { populateContactsMenu(contactsJson, action); }, 100);
    }
}

function populateMessageMenu(messageJson, ownerPhone) {
    // Check if the messages are loaded
    if (true) {
        
        // Initialize the values
        purchasedAmount = 1;
        selected = undefined;

        // Get items to show
        let messageArray = JSON.parse(messageJson);
        let header = document.getElementById('header');
        let content = document.getElementById('content');
        let options = document.getElementById('options');

        content.innerHTML = '';

        let uniqueMessageArray = [];
        messageArray.map(data => {
            let isDuplicate = false
            uniqueMessageArray.map(val => {
                if(val.target === data.target && val.phone === data.phone) isDuplicate = true;
            })
            if(!isDuplicate) {
                if(data.phone.toString() === ownerPhone) uniqueMessageArray.push({...data, type: 'sent'})
                if(data.target.toString() === ownerPhone) uniqueMessageArray.push({...data, phone: data.target, target: data.phone, type: 'received'}) 
            }
        })

        uniqueMessageArray = _.uniqBy(uniqueMessageArray, 'target')




        document.getElementById('fortest').textContent = uniqueMessageArray.length

        // let uniqueMessageSentArray = _.uniqBy(messageArray, 'target');
        // uniqueMessageSentArray = uniqueMessageSentArray.filter(data > data.phone === ownerPhone)


        // messageArray.map(msg => {
        //     if(!uniqueMessageArray.includes(data => {return data.target===msg.target})) uniqueMessageArray.push({target: msg.target, message: msg.message})
        // })

        // Show business name
        // header.textContent = i18next.t('telephone.contact-list');

        for (let i = 0; i < uniqueMessageArray.length; i++) {
            document.getElementById('fortest').textContent = document.getElementById('fortest').textContent + ' ' + i;
            
            let item = uniqueMessageArray[i];

            let newMessage = messageArray.filter(data => ((data.phone === item.target && data.target === item.phone)) && (data.isRead === 0))

            let itemContainer = document.createElement('div');
            let infoContainer = document.createElement('div');
            let descContainer = document.createElement('div');
            let purchaseContainer = document.createElement('div');
            let priceContainer = document.createElement('div');
            let itemDescription = document.createElement('span');
            let itemPrice = document.createElement('span');

            itemContainer.classList.add('item-row');
            infoContainer.classList.add('item-content');
            descContainer.classList.add('item-header');
            purchaseContainer.classList.add('item-purchase');
            priceContainer.classList.add('item-price-container');
            itemDescription.classList.add('item-description');
            itemPrice.classList.add('item-price');

            let itemRow = document.createElement('div');
            let itemElemPic = document.createElement('div');
            let itemElemTitle = document.createElement('div');
            let itemElemPuce = document.createElement('div');
            let itemElemDescription = document.createElement('div');

            itemRow.classList.add('element');
            itemElemPic.classList.add('elem-pic');
            itemElemTitle.classList.add('elem-title-has-desc');
            itemElemPuce.classList.add('elem-puce');

            itemElemDescription.classList.add('elem-description');


            itemElemPic.textContent = item.target.toString()[0];
            itemElemPuce.textContent = newMessage.length;
            itemElemTitle.textContent = item.target;
            itemElemDescription.textContent = item.type==="sent"?"คุณ: " + item.message: item.message;


            // itemElemPic.appendChild(itemElemTitle)
            itemRow.appendChild(itemElemPic)
            if(newMessage.length > 0) itemRow.appendChild(itemElemPuce)

            itemRow.onclick = (function() {
                mp.trigger("getMessageWithApp", item.target.toString());

            })
            
            itemRow.appendChild(itemElemTitle)
            itemRow.appendChild(itemElemDescription)
            content.appendChild(itemRow);

                // <div class="element">
                //     <div class="elem-pic"
                //         style="color: rgb(255, 255, 255); background-color: blue; border-radius: 50%;">
                //         item.contactName[0]
                //     </div>
                //     <div class="elem-title" >item.contactName</div>
                // </div>

            // itemDescription.textContent = (item.contactName);
            // itemDescription.appendChild(itemRow);

            // itemPrice.innerHTML = '<b>' + item.contactNumber + '</b>';

            itemContainer.onclick = (function () {
                // Check if the item is not selected
                if (selected !== i) {
                    // Check if there was any item selected
                    if (selected != undefined) {
                        let previousSelected = document.getElementsByClassName('item-row')[selected];
                        previousSelected.classList.remove('active-item');
                    }

                    // Select the item
                    let currentSelected = document.getElementsByClassName('item-row')[i];
                    currentSelected.classList.add('active-item');

                    // Store the item
                    selected = i;
                }
            });

            
            // itemContainer.appendChild(infoContainer);
            // infoContainer.appendChild(descContainer);
            // descContainer.appendChild(itemDescription);
            // infoContainer.appendChild(purchaseContainer);
            // purchaseContainer.appendChild(priceContainer);
            // priceContainer.appendChild(itemPrice);
        }

        // Add option buttons
        let cancelButton = document.createElement('div');

        // Add classes for the buttons
        cancelButton.classList.add('cancel-button');
        cancelButton.classList.add(parseInt(action) > 0 ? 'double-button' : 'single-button');

        // Add text for the buttons
        cancelButton.textContent = i18next.t('general.exit');

        if (parseInt(action) > 0) {
            let actionButton = document.createElement('div');
            actionButton.classList.add('double-button', 'accept-button');
            actionButton.textContent = getContactActionText(action);

            actionButton.onclick = (function () {
                // Check if the user purchased anything
                if (selected != undefined) {
                    mp.trigger('executePhoneAction', selected);
                }
            });

            options.appendChild(actionButton);
        }

        cancelButton.onclick = (function () {
            // Close the purchase window
            mp.trigger('destroyBrowser');
        });

        options.appendChild(cancelButton);

        clearTimeout(timeout);
    } else {
        // Wait for the messages to be loaded
        clearTimeout(timeout);
        timeout = setTimeout(function () { populateContactsMenu(contactsJson, action); }, 100);
    }
}



function populateMessageWithMenu(messageJson, ownerPhone) {
    // Check if the messages are loaded
    if (true) {
        
        // Initialize the values
        purchasedAmount = 1;
        selected = undefined;

        // Get items to show
        let messageArray = JSON.parse(messageJson);
        let header = document.getElementById('header');
        let content = document.getElementById('content');
        let options = document.getElementById('options');

        content.innerHTML = '';

        let uniqueMessageArray = [];
        messageArray.map(data => {
            if(data.phone.toString() === ownerPhone) uniqueMessageArray.push({...data, type: 'sent'})
            if(data.target.toString() === ownerPhone) uniqueMessageArray.push({...data, type: 'received'}) 
            
        })







        // let uniqueMessageSentArray = _.uniqBy(messageArray, 'target');
        // uniqueMessageSentArray = uniqueMessageSentArray.filter(data > data.phone === ownerPhone)


        // messageArray.map(msg => {
        //     if(!uniqueMessageArray.includes(data => {return data.target===msg.target})) uniqueMessageArray.push({target: msg.target, message: msg.message})
        // })

        // Show business name
        // header.textContent = i18next.t('telephone.contact-list');


        for (let i = 0; i < uniqueMessageArray.length; i++) {
            
            let item = uniqueMessageArray[i];

            if(item.type === 'sent') document.getElementById('nameTarget').textContent = item.target;
            if(item.type === 'received') document.getElementById('nameTarget').textContent = item.phone;

            

            // let newMessage = messageArray.filter(data => ((data.target === item.target && data.phone === item.phone) || (data.phone === item.target && data.target === item.phone)) && (data.isRead === 0))

            // let itemContainer = document.createElement('div');
            // let infoContainer = document.createElement('div');
            // let descContainer = document.createElement('div');
            // let purchaseContainer = document.createElement('div');
            // let priceContainer = document.createElement('div');
            // let itemDescription = document.createElement('span');
            // let itemPrice = document.createElement('span');

            // itemContainer.classList.add('item-row');
            // infoContainer.classList.add('item-content');
            // descContainer.classList.add('item-header');
            // purchaseContainer.classList.add('item-purchase');
            // priceContainer.classList.add('item-price-container');
            // itemDescription.classList.add('item-description');
            // itemPrice.classList.add('item-price');

            let itemRow = document.createElement('div');
            let itemRowSpan = document.createElement('span');
            let itemRowSpan2 = document.createElement('span');
            let itemRowSpan3 = document.createElement('span');
            let itemRowTime = document.createElement('span');


            itemRow.classList.add('sms');
            itemRowSpan.classList.add('sms_message');
            itemRowSpan.classList.add('sms_me');

            if(item.type === 'received') itemRowSpan.classList.add('sms_other');
            itemRowTime.classList.add('sms_time');


            itemRowSpan2.textContent = item.message;
            // var MessageTime = new Date(item.date)
            // var NowTime = new Date()
            // var diffTimeSec = (NowTime.getTime() - MessageTime.getTime()) / (1000*60)
            // itemRowTime.textContent = item.date.toString() + " นาทีที่แล้ว"

            
            itemRowSpan3.appendChild(itemRowTime);
            itemRowSpan.appendChild(itemRowSpan3);
            itemRowSpan.appendChild(itemRowSpan2);
            itemRow.appendChild(itemRowSpan);
            content.appendChild(itemRow);


                // <div class="element">
                //     <div class="elem-pic"
                //         style="color: rgb(255, 255, 255); background-color: blue; border-radius: 50%;">
                //         item.contactName[0]
                //     </div>
                //     <div class="elem-title" >item.contactName</div>
                // </div>

            // itemDescription.textContent = (item.contactName);
            // itemDescription.appendChild(itemRow);

            // itemPrice.innerHTML = '<b>' + item.contactNumber + '</b>';

            

            
            // itemContainer.appendChild(infoContainer);
            // infoContainer.appendChild(descContainer);
            // descContainer.appendChild(itemDescription);
            // infoContainer.appendChild(purchaseContainer);
            // purchaseContainer.appendChild(priceContainer);
            // priceContainer.appendChild(itemPrice);
        }

        clearTimeout(timeout);
    } else {
        // Wait for the messages to be loaded
        clearTimeout(timeout);
        timeout = setTimeout(function () { populateContactsMenu(contactsJson, action); }, 100);
    }
}
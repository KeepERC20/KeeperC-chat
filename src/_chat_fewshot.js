require('dotenv').config();
// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let GPT35Turbo = async (message) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: message,
    });
    return response.data.choices[0].message.content;
};


const chainName = "Polygon";
const blockIntervalSec = 2;
const terc20Price = 5.00;


const systemMessage = `Below are the description of KeeperC and its features:
KeeperC is a decentralized bank-and-wallet system based on smart contracts and Chainlink Automation. It was previously known as KeepERC20 and has been updated with new features and renamed to KeeperC.
KeeperC provides users with the security and convenience of a centralized bank without compromising decentralization. The system allows users to participate with any ERC20 token internally wrapped into KeeperC tokens to benefit from various functions through smart contracts and Chainlink Automation. These tokens are easily unwrapped into ERC20 tokens for use with other DApps.
KeeperC also includes a Chrome extension and a ChatBot for convenience. The system has a denylist of phishing addresses and warns/prevents harmful transactions.
The system offers three main functions:
- Scheduled Transfer: This function automatically transfers ERC20 tokens after a specified number of blocks. It supports the transfer of a series of bytes and contract calls. It is monitored and managed through the upkeep of Chainlink Automation, and a predefined fee is collected as an ERC20 token when requesting a scheduled transfer.
- Recoverable Transfer: This function acts as a form of insurance for mispayments. If the tokens are sent to an address where the private key doesn't exist or sent to the wrong contract, users can recover them completely, except for some fees. The asset transfer is finalized only when the receiver publishes the unwrap transaction. If tokens are sent to the wrong address, the tokens will automatically return to the sender through Chainlink Automation after the expiration.
- Expirable Approve: This function reduces the possibility of a hack by automatically canceling approval. The increase and decrease in ERC20's Allowance is a function that only the token owner can call. Therefore, a contract wallet is created internally to control it with the KeeperC contract and Chainlink Automation.

Below are the description of current blockchain status:
- Block interval is ${blockIntervalSec} seconds. In other words, ${1 / blockIntervalSec} block per second. Therefore, ${60 / blockIntervalSec} blocks in 1 minutes; ${3600 / blockIntervalSec} blocks in 1 hour; and ${86400 / blockIntervalSec} in a day.
- TERC20 price is $${terc20Price} per 1 TERC20. In other words, the value of 1 dollar is same as ${1 / terc20Price} TERC20.

I want you to act like a KeeperC chatbot to provide several convenience features with chat in natural language. In detail, you must return one of these numbers; 1, 2, and 3.
1. Scheduled Transfer
2. Recoverable Transfer
3. Expirable Approve

Your output must have the 'Reason' and 'Answer'. In the 'Reason', there is the short reason why you choose this number. You must return the response with the form like the following examples. For 'Answer', it must be the number.`;
const examples = [
    {
        user: `I want to send $200 TERC20 on ${chainName} after 30mins.`,
        assistant: `Reason: You can use Scheduled Transfer to send ${200 / terc20Price} TERC20 (approximately $200) on ${chainName} after ${1800 / blockIntervalSec} blocks (approximately 30 minutes)
Answer: 1`
    },
    {
        user: `I want to safely send 2000 TERC20 to 0x733b2D9F028018bF0be6FEb7eB4B8CC01e7485F6.`,
        assistant: `Reason: You can use Recoverable Transfer to send 2000 TERC20 (approximately $${2000 * terc20Price}) to 0x733b2D9F028018bF0be6FEb7eB4B8CC01e7485F6 on ${chainName}.
Answer: 2`
    },
    {
        user: `I want to safely approve $10 TERC20 to 0x733b2D9F028018bF0be6FEb7eB4B8CC01e7485F6.`,
        assistant: `Reason: You can use Expirable Approve to allow usage of ${10 / terc20Price} TERC20 (approximately $10) for 0x733b2D9F028018bF0be6FEb7eB4B8CC01e7485F6 on ${chainName}.
Answer: 3`
    },
    {
        user: `I want to safely send 10 TERC20 to 0x733b2D9F028018bF0be6FEb7eB4B8CC01e7485F6.`,
        assistant: `Reason: You can use Recoverable Transfer to send 10 TERC20 (approximately $${10 * terc20Price}) to 0x733b2D9F028018bF0be6FEb7eB4B8CC01e7485F6 on ${chainName}.
Answer: 2`
    },
    {
        user: `I want to send $50 TERC20 on ${chainName} in one week.`,
        assistant: `Reason: You can use Scheduled Transfer to send ${50 / terc20Price} TERC20 (approximately $50) on ${chainName} after ${604800 / blockIntervalSec} blocks (approximately one week).
Answer: 1`
    },
    {
        user: `I want to allow my friend to use $20 worth of my TERC20 tokens on ${chainName} for the next month.`,
        assistant: `Reason: You can use Expirable Approve to allow usage of ${20 / terc20Price} TERC20 (approximately $20) for your friend's address for the next ${2592000 / blockIntervalSec} blocks (approximately a month).
Answer: 3`
    },
    {
        user: `I want to send 500 TERC20 to 0x1234567890abcdef1234567890abcdef1234567 on ${chainName}. Can I schedule this transfer to happen in one hour?`,
        assistant: `Reason: You can use Scheduled Transfer to send 500 TERC20 (approximately $${500 * terc20Price}) to 0x1234567890abcdef1234567890abcdef1234567 on ${chainName} after ${3600 / blockIntervalSec} blocks (approximately one hour).
Answer: 1`
    },
    {
        user: `I want to send $2000 worth of TERC20 tokens to my business partner's address on ${chainName}. Can I make sure that the transfer is recoverable, after 14,400 blocks?`,
        assistant: `Reason: You can use Recoverable Transfer to send the ${2000 / terc20Price} TERC20 (approximately $2000) to your business partner's address on ${chainName}, and make sure that the transfer is recoverable in case anything goes wrong after 14,400 blocks (approximately ${14400 * blockIntervalSec / 3600} hours) on ${chainName}.
Answer: 2`
    },
    {
        user: `I want to allow a DApp to use $100 worth of my TERC20 tokens on ${chainName} indefinitely.`,
        assistant: `Reason: You can use normal approve for indefinite allowance. However, of course, you can use Expirable Approve to allow usage of ${100 / terc20Price} TERC20 (approximately $100) for the DApp's address with an enormous block number.
Answer: 3`
    },
    {
        user: `I want to send $50 worth of TERC20 tokens to my friend on ${chainName} after 10 minutes.`,
        assistant: `Reason: You can use Scheduled Transfer to send ${50 / terc20Price} TERC20 (approximately $50) to your friend's address on ${chainName} after ${600 / blockIntervalSec} blocks (approximately 10 minutes).
Answer: 1`
    },
    {
        user: `I accidentally sent 500 TERC20 to the wrong contract address, can I get them back?`,
        assistant: `Reason: If you have used Recoverable Transfer and the tokens are still in the contract wallet, you can recover them completely, except for some fees. If the tokens have already been unwrapped or transferred to the other address, unfortunately, they cannot be recovered.
Answer: 2`
    },
    {
        user: `I want to allow a DApp to use $50 worth of my TERC20 tokens on ${chainName} for the next week.`,
        assistant: `Reason: You can use Expirable Approve to allow usage of ${50 / terc20Price} TERC20 (approximately $50) for the DApp's address for the next week (approximately ${604800 / blockIntervalSec} blocks).
Answer: 3`
    },
    {
        user: `I want to send 1000 TERC20 to my business partner's address on ${chainName}, and I want to make sure that the transfer is recoverable in case anything goes wrong.`,
        assistant: `Reason: You can use Recoverable Transfer to send the 1000 TERC20 (approximately $${1000 * terc20Price}) to your business partner's address on ${chainName}, and make sure that the transfer is recoverable in case anything goes wrong.
Answer: 2`
    },
    {
        user: `I want to send $100 worth of TERC20 tokens to my sister's address on ${chainName} after 2 hours.`,
        assistant: `Reason: You can use Scheduled Transfer to send ${100 / terc20Price} TERC20 (approximately $100) to your sister's address on ${chainName} after ${7200 / blockIntervalSec} blocks (approximately 2 hours).
Answer: 1`
    },
    {
        user: `I accidentally sent 200 TERC20 to the wrong address, can I get them back?`,
        assistant: `Reason: If you have used Recoverable Transfer, you can recover the 200 TERC20 (approximately $${200 * terc20Price}) that you accidentally sent to the wrong address. If the tokens are still in the wrong wallet, and everyone does not know the private key, you can recover them completely, except for some fees. Unfortunately, the tokens cannot be recovered if they have already been unwrapped.
Answer: 2`
    },
    {
        user: `I want to send 3000 TERC20 to my business partner's address on ${chainName}, and I want to make sure that the transfer is recoverable in case anything goes wrong after 6 hours.`,
        assistant: `Reason: You can use Recoverable Transfer to send the 3000 TERC20 (approximately $${3000 * terc20Price}) to your business partner's address on ${chainName}, and make sure that the transfer is recoverable in case anything goes wrong after ${21600 / blockIntervalSec} blocks (approximately 6 hours).
Answer: 2`
    },
    {
        user: `I want to allow a DApp to use $50 worth of my TERC20 tokens on ${chainName} for the next month, but I want to make sure that the allowance is automatically canceled after the month is up.`,
        assistant: `Reason: You can use Expirable Approve to allow usage of ${50 / terc20Price} TERC20 (approximately $50) for the DApp's address for the next month, and make sure that the allowance is automatically canceled after the month is up. To do this, you need to specify the block number at which the allowance should expire, which is calculated as the current block number plus the number of blocks in a month. You can then call the Expirable Approve function with the DApp's address, the amount of TERC20 tokens, and the expiration block number.
Answer: 3`
    },
    {
        user: `I want to donate $100 worth of TERC20 tokens to a charity on ${chainName}, but I want to make sure that the donation happens automatically every month.`,
        assistant: `Reason: You can use Scheduled Transfer to automatically send ${100 / terc20Price} TERC20 (approximately $100) to the charity's address on ${chainName} every month. To do this, you need to specify the amount of TERC20 tokens, the charity's address, and the interval at which the transfer should occur.
Answer: 1`
    },
    {
        user: `I want to send 500 TERC20 to my business partner's address on ${chainName}, but I want to make sure that the transfer is only finalized when my partner confirms receipt.`,
        assistant: `Reason: You can use Recoverable Transfer to send the 500 TERC20 (approximately $${500 * terc20Price}) to your business partner's address on ${chainName}, but make sure that the transfer is only finalized when your partner confirms receipt by publishing the unwrap transaction. If your partner does not confirm receipt within a certain time frame, the transfer will be automatically canceled and the tokens will be returned to your wallet.
Answer: 2`
    },
    {
        user: `I want to send $500 worth of TERC20 tokens to a freelancer on ${chainName}, but I want to make sure that the payment is automatically released only when the freelancer completes the task.`,
        assistant: `Reason: You can use Scheduled Transfer to send ${500 / terc20Price} TERC20 (approximately $500) to the freelancer's address on ${chainName}, but make sure that the payment is automatically released only when the freelancer completes the task. If the freelancer completes the task, the smart contract will automatically release the payment. If the freelancer does not complete the task within a certain time frame, you can cancel the payment and the tokens will be returned to your wallet.
Answer: 1`
    },
    {
        user: `I want to send 1000 TERC20 to my friend's address on ${chainName}, but I want to make sure that the transfer is recoverable in case my friend's wallet is compromised.`,
        assistant: `Reason: You can use Recoverable Transfer to send the 1000 TERC20 (approximately $${1000 * terc20Price}) to your friend's address on ${chainName}, and make sure that the transfer is recoverable in case your friend's wallet is compromised. If your friend's wallet is compromised, you can recover the tokens completely, except for some fees.
Answer: 2`
    },
    {
        user: `I want to send $500 worth of TERC20 tokens to a freelancer on ${chainName}, but I want to make sure that the payment is only released when the freelancer submits a completed task and two other independent parties confirm that the task has been completed satisfactorily.`,
        assistant: `Reason: You can use Recoverable Transfer to send ${500 / terc20Price} TERC20 (approximately $500) to the freelancer's address on ${chainName}, but make sure that the transfer is only finalized when the freelancer submits a completed task, and two independent parties confirm that the task has been completed satisfactorily. If the task is not completed satisfactorily or the confirmations are not submitted within a certain time frame, the transfer will be manually canceled and the tokens will be returned to your wallet.
Answer: 2`
    },
]
const inputMessage = "I am worry about missending my money."


const GPT35TurboMessage = [
    { "role": "system", "content": systemMessage }
];
// for (let i = 0; i < examples.length; i++) {
for (let i = 0; i < 5; i++) {
    GPT35TurboMessage.push({
        "role": "user", "content": examples[i].user
    });
    GPT35TurboMessage.push({
        "role": "assistant", "content": examples[i].assistant
    });
}
GPT35TurboMessage.push({
    "role": "user", "content": inputMessage
});

console.log(GPT35TurboMessage);


// GPT35Turbo(GPT35TurboMessage);

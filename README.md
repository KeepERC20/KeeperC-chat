# KeeperC Chat(+Bot)

TBD

---

# How to Use

1. Set `.env` with `OPENAI_ORGANIZATION` and `OPENAI_API_KEY`.
2. Run `node src/chat.js`.

# Examples

Input:
```
I want to allow a DApp to use my TERC20 tokens on Polygon, but I want to make sure that the allowance is automatically canceled if the DApp is hacked or compromised. Is this possible?
```

Response:
```
Reason: Yes, you can use Expirable Approve to allow the DApp to use a certain amount of TERC20 tokens, but make sure that the allowance is not automatically canceled if the DApp is hacked or compromised. You must specify the block number at which the allowance expires. This prevents the TERC20 tokens from being used maliciously if the dApp is hacked in the future.
Answer: 3
```

---

Input:
```
I want to invest $1000 worth of TERC20 tokens in a new DeFi project that will launch in two weeks on Polygon. Can I schedule the transfer to happen automatically on the launch day?
```

Response:
```
Reason: You can use Scheduled Transfer to send 200 TERC20 (approximately $1000) to the DeFi project's address on Polygon after 604,800 blocks (approximately two weeks) automatically. This will ensure that your investment is made automatically on the launch day without you having to manually send the tokens.
Answer: 1
```

---

Input:
```
I want to send $500 worth of TERC20 tokens to a freelancer on Polygon, but I want to make sure that the payment is only released when the freelancer submits a completed task and two other independent parties confirm that the task has been completed satisfactorily.
```

Response:
```
Reason: You can use Recoverable Transfer to send 100 TERC20 (approximately $500) to the freelancer's address on Polygon, but make sure that the transfer is only finalized when the freelancer submits a completed task, and two independent parties confirm that the task has been completed satisfactorily. If the task is not completed satisfactorily or the confirmations are not submitted within a certain time frame, the transfer will be manually canceled and the tokens will be returned to your wallet.
Answer: 2
```

---

Input:
```
I want to send $200 worth of TERC20 tokens to a new user on Polygon, but I'm worried that I might accidentally send the tokens to the wrong address. Can I make sure that the transfer is recoverable in case of a mistake?
```

Response:
```
Reason: You can use Recoverable Transfer to send 40 TERC20 (approximately $200) to the new user's address on Polygon, and make sure that the transfer is recoverable in case of a mistake. If you accidentally send the tokens to the wrong address or the user's wallet is compromised, you can recover the tokens completely, except for some fees.
Answer: 2
```

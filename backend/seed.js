const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

dotenv.config();

// Helper to enforce exactly 4 options per your schema notes in 38922.png
const q = (text, opts, ans) => {
  if (opts.length !== 4) {
    throw new Error(`Schema Violation: Question "${text}" must have exactly 4 choices.`);
  }
  return {
    questionText: text,
    options: opts,
    correctAnswerIndex: ans,
    points: 10
  };
};

// Placeholder Admin/System Creator ID matching your ref: 'User'
const SYSTEM_CREATOR_ID = new mongoose.Types.ObjectId();

const quizData = [
  // ==========================================
  // 1. BLOCKCHAIN (5 Quizzes, 20 Questions Each)
  // ==========================================
  { 
    title: "Ethereum Basics", 
    category: "blockchain", 
    description: "Smart contract fundamentals and Ethereum architecture.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What is the main language used for Ethereum smart contracts?", ["Solidity", "Rust", "Java", "C++"], 0),
      q("What is Gas on the Ethereum network?", ["A governance token", "A transaction execution fee", "A network speed booster", "A type of crypto wallet"], 1),
      q("What does DAO stand for in the web3 ecosystem?", ["Digital Asset Office", "Decentralized Anonymous Org", "Decentralized Autonomous Org", "Distributed Application Object"], 2),
      q("The Merge consensus upgrade moved Ethereum to which mechanism?", ["Proof of Work", "Proof of Stake", "Proof of History", "Proof of Authority"], 1),
      q("What is the primarily designed use case for the ERC-20 standard?", ["Non-Fungible Tokens", "Fungible Utility Tokens", "Hardware Wallet protocols", "Node validation systems"], 1),
      q("What is the native currency utilized to pay for gas on Ethereum?", ["Bitcoin (BTC)", "Ether (ETH)", "Solana (SOL)", "Cardano (ADA)"], 1),
      q("What component runs compiled smart contracts across Ethereum nodes?", ["Ethereum Virtual Machine (EVM)", "Java Virtual Machine (JVM)", "V8 JavaScript Engine", "LLVM Compiler Infrastructure"], 0),
      q("Which ERC standard explicitly defines unique, non-fungible tokens?", ["ERC-20", "ERC-721", "ERC-777", "ERC-1155"], 1),
      q("What is the current primary testnet framework for Ethereum developers?", ["Sepolia", "Mainnet", "Polygon Edge", "Solana Devnet"], 0),
      q("Which network layout operates as a popular Ethereum Layer 2 scaling layer?", ["Arbitrum", "Solana Mainnet", "Cardano Settlement", "Polkadot Relay"], 0),
      q("What is a Gwei denominational unit?", ["A hardware wallet brand", "A tiny fractional unit of ETH", "A smart contract testing tool", "A decentralized browser extension"], 1),
      q("What happens to base transaction fees under the EIP-1559 upgrade?", ["Sent entirely to miners", "Permanently burned from circulation", "Distributed to staking pools", "Donated to the Ethereum Foundation"], 1),
      q("Which development environment is most commonly used to compile Ethereum contracts?", ["Hardhat", "React.js Framework", "Express Node Router", "Django Framework"], 0),
      q("What does a 'constructor' function execute in a Solidity contract?", ["Destroys the deployed code", "Initializes state variables on deployment", "Calculates real-time gas costs", "Routes outbound token transfers"], 1),
      q("Which function visibility modifier restricts contract calls to the owner only?", ["public", "onlyOwner", "external", "pure"], 1),
      q("What are user-facing applications built on blockchains called?", ["Decentralized Apps (DApps)", "Software as a Service (SaaS)", "RESTful Application Interfaces", "Microservice Containers"], 0),
      q("Which data location is the most gas-expensive layout inside Solidity?", ["Memory allocation", "Storage persistence", "Calldata read-only", "Stack execution space"], 1),
      q("Which keyword explicitly allows a Solidity function to accept incoming Ether?", ["view", "payable", "pure", "internal"], 1),
      q("What type of external software service feeds real-world data to Ethereum?", ["Validator Node", "Blockchain Oracle", "Proof Miner", "Rollup Sequencer"], 1),
      q("What is the default block validation time target for modern post-Merge Ethereum?", ["12 seconds", "10 minutes", "2 minutes", "1 second"], 0)
    ] 
  },
  { 
    title: "Bitcoin Core", 
    category: "blockchain", 
    description: "The OG protocol architecture and cryptographic foundations.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("Who is credited as the pseudonymous creator of Bitcoin?", ["Satoshi Nakamoto", "Vitalik Buterin", "Elon Musk", "Hal Finney"], 0),
      q("What is the absolute maximum hard-coded supply limitation of Bitcoin?", ["21 Million", "100 Million", "18 Million", "Infinite supply"], 0),
      q("What is the target block generation time interval for Bitcoin?", ["1 minute", "10 minutes", "30 seconds", "1 hour"], 1),
      q("What is the Bitcoin halving event?", ["Splitting the coin value", "Cutting the block reward in half", "A sudden market price drop", "A network consensus hard fork"], 1),
      q("What is the very first block mined on the Bitcoin network called?", ["The Alpha Block", "The Genesis Block", "The Starter Block", "The Root Element"], 1),
      q("What specific cryptographic hashing algorithm does Bitcoin rely on?", ["Scrypt engine", "SHA-256", "Ethash matrix", "Keccak-256 protocol"], 1),
      q("What transactional data accounting model does Bitcoin use?", ["Account-Based balance tracking", "Unspent Transaction Output (UTXO)", "State-Tree tracking", "Mempool processing logic"], 1),
      q("What is the absolute smallest divisible unit of a Bitcoin?", ["Finney token", "Satoshi unit", "Gwei parameter", "Wei denominator"], 1),
      q("How many structural Satoshis constitute one whole Bitcoin?", ["1,000 units", "1,000,000 units", "100,000,000 units", "1,000,000,000 units"], 2),
      q("What validation consensus framework secures the native Bitcoin ledger?", ["Proof of Stake", "Proof of Work", "Proof of History", "Delegated Staking"], 1),
      q("Where do pending unconfirmed Bitcoin transactions wait to be mined?", ["The Mempool staging area", "The local block directory", "The physical node hardware", "The decentralized oracle"], 0),
      q("How often does Bitcoin automatically adjust its mining difficulty parameters?", ["Every single block mined", "Every 2,016 blocks processed", "Exactly once per calendar year", "Every 100 blocks processed"], 1),
      q("Which network change represents a famous historical Bitcoin hard fork?", ["Ethereum classic alternative", "Bitcoin Cash (BCH)", "Solana network layer", "Litecoin core protocol"], 1),
      q("What basic structural network morphology characterizes the Bitcoin grid?", ["Centralized client array", "Peer-to-Peer decentralized layout", "Client-Server cluster design", "Closed Intranet gateway"], 1),
      q("What primary function does a Bitcoin mining entity perform?", ["Generating random wallet addresses", "Validating and recording transactions", "Designing custom web token layouts", "Hosting static website nodes"], 1),
      q("What layer-2 protocol scales instant micro-payments over Bitcoin?", ["The Lightning Network", "Arbitrum rollup framework", "Optimism scaling stack", "Polygon sidechain system"], 0),
      q("Who received the historic first Bitcoin transaction from Satoshi Nakamoto?", ["Hal Finney", "Nick Szabo", "Craig Wright", "Gavin Andresen"], 0),
      q("Which Script opcode instruction validates signatures within Bitcoin transactions?", ["OP_CHECKSIG", "OP_ADD", "OP_RETURN", "OP_DUP"], 0),
      q("What mathematical elliptic curve handles Bitcoin private/public key pairs?", ["secp256k1 Curve", "Curve25519 layout", "RSA-2048 parameters", "Ed25519 standard"], 0),
      q("What target year is estimated for the final Bitcoin token block reward minting?", ["Year 2040", "Year 2140", "Year 2030", "Year 2200"], 1)
    ] 
  },
  { 
    title: "Web3/DEX", 
    category: "blockchain", 
    description: "DeFi protocols, automated market makers, and non-fungible assets.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What does the core industry acronym DEX stand for?", ["Digital Exchange Format", "Decentralized Exchange", "Direct External Execution", "Data Extraction Route"], 1),
      q("What is the primary role of a non-custodial wallet seed phrase?", ["Standard application password", "Master private key recovery phrase", "Public user profile name", "Database index reference key"], 1),
      q("What descriptive phrase captures the meaning of an NFT asset?", ["Non-Fungible Token", "New Fast Transaction", "Net Flow Token", "Node Filtering Tool"], 0),
      q("Which platform represents a fully decentralized automated market maker exchange?", ["Coinbase Central Exchange", "Uniswap Protocol", "Binance Global Exchange", "Kraken Trading Desk"], 1),
      q("What mechanics handle asset swap exchange rates inside an automated market maker?", ["Centralized order book matching", "Automated Liquidity Pool Math", "Manual broker adjustments", "Federal reserve baseline values"], 1),
      q("What risk tracks the temporary asset value loss suffered by liquidity providers?", ["Liquidation margin trigger", "Impermanent Loss variance", "Slippage execution offset", "Phishing domain redirection"], 1),
      q("What is a cold wallet device?", ["An offline hardware device", "A browser extension script", "A centralized exchange account", "A paper check voucher"], 0),
      q("Which web3 wallet software functions widely as a browser extension?", ["Metamask Wallet", "Ledger Nano Hardware", "Gnosis Safe Contract", "Trezor Hardware Device"], 0),
      q("What does the industry sector acronym DeFi represent?", ["Deferred Asset Finance", "Decentralized Finance", "Defined File Allocation", "Digital Federation Interface"], 1),
      q("What characteristic defines a DeFi Flash Loan?", ["A 30-day collateralized debt", "An uncollateralized instant single-block loan", "A peer-to-peer mortgage agreement", "A bank line of credit alternative"], 1),
      q("What metric tracks the total aggregate capital locked inside a DeFi protocol?", ["Total Volume Lost", "Total Value Locked (TVL)", "Time Value Leverage", "Terminal Vector Line"], 1),
      q("Which multi-token standard combines features of both ERC-20 and ERC-721?", ["ERC-223 alternative", "ERC-1155 standard", "ERC-777 configuration", "ERC-20 standard variant"], 1),
      q("What receipt asset are automated market maker liquidity providers given?", ["LP Tokens", "Generative NFT Artwork", "Physical Bitcoin certificates", "Gas fee credit discount notes"], 0),
      q("What does slippage mean during a high-volume token swap?", ["Loss of wallet connections", "Price variance between submission and execution", "A malicious routing exploit", "An automated gas fee discount"], 1),
      q("Which crypto asset functions as a decentralized, over-collateralized stablecoin?", ["Tether (USDT)", "Dai Stablecoin (DAI)", "USD Coin (USDC)", "Binance USD (BUSD)"], 1),
      q("What is the process of locking crypto tokens in protocols to earn yield incentives?", ["Yield Farming / Staking", "Data mining extraction", "Hardware node assembly", "NFT marketplace bidding"], 0),
      q("What token type provides network holders with systemic voting rights on upgrade proposals?", ["Governance token", "Stablecoin peg asset", "Gas utility token", "Wrapped baseline asset"], 0),
      q("What specific utility does wrapping a token (e.g., WBTC) achieve?", ["Hiding internal ledger history", "Cross-chain protocol compatibility", "Reducing transaction gas fees to zero", "Permanently deleting the asset supply"], 1),
      q("What decentralized naming system translates complex Ethereum addresses into text domains?", ["ENS (.eth)", "DNS routing maps", "IPFS content hashes", "ICANN lookups"], 0),
      q("What decentralized file protocol hosts web3 frontends without central servers?", ["IPFS storage network", "AWS S3 container", "SQL cloud storage", "Express Node framework"], 0)
    ] 
  },
  { 
    title: "Security", 
    category: "blockchain", 
    description: "Smart contract exploit identification and secure coding practices.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What occurs during a smart contract reentrancy exploit?", ["External fallback loops hijack contract flows", "The compiler crashes completely", "A user phishes web configurations", "An internal integer drops below zero"], 0),
      q("What process describes hiring external engineers to review smart contract code?", ["A code audit", "A public token sale", "A system hot-fix update", "A standard database backup"], 0),
      q("What parameter limits the maximum computational steps an Ethereum transaction can use?", ["The hard token supply limit", "The transaction Gas Limit", "The fixed Gwei market price", "The block mining speed cap"], 1),
      q("Which structural code pattern avoids common reentrancy attacks in Solidity?", ["Checks-Effects-Interactions Pattern", "Singleton Design Layout", "Factory Contract Pattern", "Proxy Upgrade Route"], 0),
      q("What keyword renders a state variable unchangeable after a contract is deployed?", ["constant", "immutable", "view", "pure"], 1),
      q("What classification covers attacks where miners reorder block transactions for profit?", ["Phishing redirections", "Miner Extractable Value (MEV) / Frontrunning", "Distributed Denial of Service", "Sybil node duplication"], 1),
      q("What software vulnerability caused the historic DAO exploit in 2016?", ["Integer Overflow math bug", "Reentrancy logic loop", "Access Control credential failure", "Malicious oracle injection data"], 1),
      q("Which community library provides vetted, secure smart contract templates?", ["OpenZeppelin Library", "Hardhat Environment", "Ethers.js Client Utility", "Web3.js Script Framework"], 0),
      q("What vulnerability happens when computational math calculations exceed memory limits?", ["Underflow bounds error", "Integer Overflow vulnerability", "Reentrancy call recursion", "Race condition routing"], 1),
      q("What code component specifies matching solidity compiler parameters inside files?", ["The pragma solidity directive", "The system gas estimator", "The network deployment target", "The web3 provider configuration"], 0),
      q("What testing methodology feeds randomized inputs into contracts to check for crashes?", ["Fuzzing / Fuzz Testing", "Manual line inspections", "Static analysis parsing", "Unit testing checks"], 0),
      q("Why is relying directly on block.timestamp for random number generation dangerous?", ["It is a private hidden field", "Miners can manipulate timestamp windows slightly", "It drains massive amounts of gas", "It crashes EVM compilers instantly"], 1),
      q("Which automated security scanner parses Solidity source files for static vulnerabilities?", ["Slither tool", "Metamask extension", "Remix online console", "Node framework environment"], 0),
      q("Which function visibility configuration saves the most gas when invoked from external accounts?", ["public modifier", "external modifier", "internal modifier", "private modifier"], 1),
      q("What happens when an internal assert() function statement evaluates to false?", ["State changes revert and remaining gas is spent", "The transaction ignores the check completely", "The contract deletes itself dynamically", "New tokens are automatically minted"], 0),
      q("What configuration defines a multi-signature (multisig) smart contract wallet?", ["Requires approvals from multiple independent keys", "Uses 5 fallback seed phrases at once", "Operates exclusively inside hardware chips", "Connects straight to database nodes"], 0),
      q("What attack targets decentralized apps using manipulated external price reference inputs?", ["Reentrancy state hijacking", "Oracle Manipulation exploit", "Sybil node spoofing patterns", "Phishing link distribution"], 1),
      q("What module safely managed mathematical vulnerabilities in older Solidity compiler versions?", ["SafeMath Library", "MathJS Core Package", "CryptoCalc Extension", "BigInt JavaScript Native"], 0),
      q("What structural pattern allows developers to upgrade smart contract logic despite immutability?", ["Proxy Pattern layout", "Factory deployment setup", "Singleton contract route", "View tracking method"], 0),
      q("What security standard protects decentralized web app domains from DNS hijacking?", ["DNSSEC extensions", "HTTPS encryption links", "SSL security certs", "WAF firewall routing"], 0)
    ] 
  },
  { 
    title: "Consensus", 
    category: "blockchain", 
    description: "Distributed consensus mechanisms, safety thresholds, and liveness properties.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What main issue does a distributed consensus mechanism solve inside a blockchain?", ["Frontend responsive styling", "The double-spending validation problem", "Local network bandwidth throttling", "Database disk space partitioning"], 1),
      q("What maximum percentage of malicious nodes can a standard Byzantine Fault Tolerant setup handle?", ["Less than 33% of the network nodes", "Exactly 50% of the network nodes", "Up to 75% of the network nodes", "Absolutely 0% of the network nodes"], 0),
      q("What criteria determines block production assignment priorities inside Proof of Stake setups?", ["Raw hardware computing benchmarks", "The volume of token capital bonded/staked", "Random user account creations", "Physical server array locations"], 1),
      q("What event marks a permanent rules divergence creating two competing network variants?", ["A blockchain hard fork", "An execution slippage spike", "A DDoS network outage event", "A validator slashing event"], 0),
      q("Which consensus methodology assigns block production permissions to verified legal identities?", ["Proof of Work protocol", "Proof of Authority layout", "Proof of Stake alignment", "Byzantine Fault Tolerance setup"], 1),
      q("What classic theoretical scenario details coordination challenges across unverified network lines?", ["The Two Generals Problem", "The Travelling Salesman challenge", "The Halting logic problem", "The Knapsack optimization model"], 0),
      q("What does a 51% attack pattern imply on a Proof of Work network?", ["Owning 51% of all circulating token supplies", "Controlling a majority of network hash power", "Hacking 51 connected websites concurrently", "Modifying local source files manually"], 1),
      q("What mechanism slashes validation token deposits when nodes cheat or run invalid logs?", ["Minting bonus adjustments", "Slashing penalty events", "Frontrunning extraction loops", "Airdrop incentive distributions"], 1),
      q("What consensus system attribute guarantees a blockchain continues executing state steps without freezing?", ["Safety properties", "Liveness properties", "Immutability states", "Asymmetric encryption boundaries"], 1),
      q("What structural confirmation status means a transaction block cannot mathematically be reverted?", ["Deterministic Finality", "Probabilistic Finality", "Mempool confirmation logic", "Local node synchronization"], 0),
      q("Which consensus strategy relies heavily on synchronized physical network clocks like Solana?", ["Proof of History layout", "Proof of Work standard", "Proof of Authority rules", "Byzantine Tolerance models"], 0),
      q("What rule dictates the valid true ledger path when Proof of Work chains split?", ["The Longest Chain Rule (Highest Difficulty)", "The oldest wallet address balance rules", "The node voting count aggregation", "The alphabetical block hash order"], 1),
      q("Which layout leverages Directed Acyclic Graphs instead of sequential block chains?", ["DAG-based ledgers (e.g., IOTA)", "Bitcoin core node branches", "Ethereum virtual machine stacks", "Standard NoSQL database structures"], 0),
      q("What asset allocation model demands proof of unallocated local storage capacity from nodes?", ["Proof of Space / Proof of Capacity", "Proof of Stake validation", "Proof of Work mining scripts", "Proof of History timestamps"], 0),
      q("What is the primary operational role of a distributed ledger consensus engine?", ["Rendering web layout templates", "Maintaining a single synchronized state ledger", "Encrypting application login passwords", "Compiling custom smart contract source"], 1),
      q("What property guarantees a consensus model reaches an identical true state across all honest nodes?", ["Safety property", "Liveness property", "Slippage parameter", "Gas configuration limit"], 0),
      q("What happens during a temporary network split where validators cannot communicate?", ["Network split / Network Partition", "Hard supply burn event", "Automatic code modification", "System database delete"], 0),
      q("What type of consensus finality increases security confidence incrementally over time?", ["Probabilistic Finality", "Deterministic Finality", "Instantaneous finality blocks", "Local cache tracking"], 0),
      q("What decentralized coordination setup eliminates human management roles using code parameters?", ["DAO (Autonomous Organization)", "Centralized corporate board", "Standard local proxy node", "Server microservice array"], 0),
      q("What consensus approach requires nodes to burn real tokens to earn mining rights?", ["Proof of Burn", "Proof of Work", "Proof of Stake", "Proof of Authority"], 0)
    ] 
  },

  // ==========================================
  // 2. AI (5 Quizzes, 20 Questions Each)
  // ==========================================
  { 
    title: "Generative AI", 
    category: "ai", 
    description: "Large Language Models, transformers, and prompt engineering.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What does the core industry acronym GPT stand for?", ["General Purpose Transformer", "Generative Pre-trained Transformer", "Global Processing Tokenizer", "Great Predictive Translator"], 1),
      q("Which technology entity created the ChatGPT conversational interface model?", ["Google Brain Team", "OpenAI Research Labs", "Meta AI Division", "Microsoft Azure Cloud"], 1),
      q("What term defines the input text directions fed into a generative AI model?", ["The command prompt", "The source code bug", "The application log file", "The localized index map"], 0),
      q("What is an AI model hallucination event?", ["Generating confident but factually incorrect text", "Processing input arrays extremely fast", "Crashing local server instances completely", "Infecting systems with malicious code scripts"], 0),
      q("Which platform generates artistic image assets directly from user text descriptions?", ["Siri Virtual Assistant", "Midjourney AI Platform", "Excel Spreadsheet Software", "Spotify Streaming Media"], 1),
      q("What mechanism enables transformer architectures to focus dynamically on relevant word connections?", ["Self-Attention Mechanism", "Recurrent Layer Tracking", "Max Pooling Reductions", "Convolutional Filtering Matrix"], 0),
      q("Which hyperparameter controls the creative randomness variations of LLM token text outputs?", ["Temperature parameter", "Epoch training loops", "Batch sizing limitations", "Learning rate adjustments"], 0),
      q("What does the AI industry domain acronym NLP represent?", ["Natural Language Processing", "Neural Logic Pathing", "Network Loop Protocol", "Node Language Parser"], 0),
      q("What training alignment paradigm shapes generative models using structured human feedback comparisons?", ["RLHF alignment", "CNN image layering", "KNN distance matching", "Gradient descent sorting"], 0),
      q("What architectural configuration interfaces LLMs with external document databases to inject real-time facts?", ["RAG (Retrieval-Augmented Generation)", "Fine-Tuning model weights", "Zero-Shot prompt structures", "Tokenization character parsing"], 0),
      q("What basic linguistic segment unit does a Large Language Model process internally?", ["A single text character string", "A token chunk element", "A complete grammar sentence", "A whole document paragraph"], 1),
      q("What strategy defines zero-shot prompting configurations?", ["Supplying 10 training examples inline", "Asking a query directly without any target examples", "Training model parameters from absolute scratch", "Modifying neural weight layers manually"], 1),
      q("Which model layout largely replaced old RNNs for text sequence data processing pipelines?", ["The Transformer Architecture", "The Perceptron layer system", "The Linear Decision Tree", "The Convolutional Image Layer"], 0),
      q("What process describes fine-tuning a pre-trained generative foundation model?", ["Deleting structural layer weights", "Training existing model layers on domain-specific files", "Increasing output temperature limits manually", "Writing complex multi-step user prompts"], 1),
      q("What capability characterizes a multimodal generative AI model?", ["Running concurrently on multiple cloud servers", "Processing varied input formats like text, audio, and images", "Leveraging dozens of distinct algorithms at once", "Having multiple development teams maintain code"], 1),
      q("What is the operational definition of an LLM context window parameter?", ["The pixel scale of browser windows", "The maximum token count a model can read and process at once", "The total runtime duration of a model", "The system tracking speed dashboard logs"], 1),
      q("Which technology enterprise designed the Gemini line of multimodal foundational models?", ["OpenAI Labs", "Google DeepMind", "Meta Open Source", "Anthropic Research"], 1),
      q("Which open-source foundational LLM model library was built by Meta?", ["Claude model suite", "Llama model series", "GPT-4 commercial model", "BERT classification model"], 1),
      q("What evaluation metric calculates translation text quality benchmarks against human reference text?", ["BLEU Score metric", "Loss convergence value", "Gas operational tracking units", "Token scale configuration index"], 0),
      q("What vector space configuration maps semantic word similarities into numerical coordinates?", ["Vector Embeddings", "Hidden Layer matrices", "Bias baseline offsets", "Decision Node branches"], 0)
    ] 
  },
  { 
    title: "ML Concepts", 
    category: "ai", 
    description: "Supervised, unsupervised, optimization, and validation.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What is the primary intent behind training datasets in machine learning?", ["Evaluating final shipping code structures", "Feeding models historical inputs to learn patterns", "Logging application crash vulnerabilities", "Tracking frontend visitor browser locations"], 1),
      q("What systemic machine learning error causes models to oversimplify true data patterns?", ["High Bias errors", "System hardware latency", "Server memory leakage variables", "Database schema modifications"], 0),
      q("What unsupervised learning objective segments data rows into similar affinity categories?", ["Data record deletion", "Clustering operations", "Alphabetical index sorting", "Console terminal printing"], 1),
      q("What basic definition represents an algorithm in machine learning fields?", ["A physical robotic computing arm", "A structured mathematical step blueprint for processing data", "A silicon computer chip module", "A NoSQL database engine installation"], 1),
      q("What paradigm core differentiates deep learning systems from classical ML setups?", ["Relying exclusively on raw manual math formulas", "Leveraging deep multi-layered artificial neural networks", "Using search engines to find coding fixes", "Building standalone browser video games"], 1),
      q("What machine learning category trains models using explicitly labeled input-target pairs?", ["Supervised Learning", "Unsupervised Clustering", "Reinforcement Learning loops", "Dimensionality Reduction mappings"], 0),
      q("Which foundational optimization algorithm minimizes model errors iteratively by adjusting weight variables?", ["Gradient Descent optimization", "Random guess looping scripts", "Array element matrix sorting", "Pruning decision tree branches"], 0),
      q("What condition describes a model memorizing training patterns perfectly but failing on new validation data?", ["Overfitting condition", "Underfitting scenario", "Data normalization steps", "Loss convergence milestones"], 0),
      q("What standard data validation technique partitions historical datasets to judge model generalizability?", ["Train/Test Split splitting", "Array slice memory indexing", "Database relational query grouping", "Random index array shuffling"], 0),
      q("Which classification method groups unknown instances based on geometric distances to surrounding instances?", ["K-Nearest Neighbors (KNN)", "Linear Regression slopes", "K-Means cluster mapping", "Principal Component Analysis"], 0),
      q("What does the variable 'K' represent within a K-Means clustering algorithm setup?", ["The targeted count of target clusters to isolate", "The learning speed velocity parameter", "The internal data sample weight scale", "The overall classification accuracy threshold"], 0),
      q("Which paired metrics evaluate classification systems where skewed positive class balances exist?", ["Precision and Recall metrics", "Experience levels and XP tracking counters", "Gas usage boundaries and market cost metrics", "Canvas grid width and height parameters"], 0),
      q("What matrix grid layout visualizes true positives, false positives, true negatives, and false negatives?", ["Confusion Matrix grid", "Bar graph layout alignment", "Scatter dot coordinate chart", "Pie chart slice percentage view"], 0),
      q("Which unsupervised transformation method compresses dataset dimensionality feature volumes down safely?", ["Principal Component Analysis (PCA)", "Linear Regression model fitting", "Neural layer weight expansion", "Gradient descent loop checking"], 0),
      q("What core elements govern reinforcement learning loops guiding autonomous software agents?", ["Rewards and penalties feedback signals", "Labeled reference text sheets manually typed", "Custom CSS style sheets formatting layouts", "Database table primary indexing lookups"], 0),
      q("What characterizes a hyperparameter variable configuration in machine learning configurations?", ["An external parameter set manually prior to initiating training", "The final accuracy score generated post-training", "A hidden application system error log trace", "The number of active computer processor hardware cores"], 0),
      q("Which loss evaluation function calculates squared errors for continuous numeric regressions?", ["Mean Squared Error (MSE)", "Cross-Entropy loss tracking", "BLEU text grading algorithms", "Accuracy percentage mapping charts"], 0),
      q("What model structure divides classification choices using cascading attribute tree thresholds?", ["Decision Tree models", "Neural web configurations", "Hash ring routing logic", "Array stack element lines"], 0),
      q("What methodology ensembles predictions from multiple underlying sub-models to optimize final accuracy?", ["Ensemble Learning methods", "Single epoch linear checks", "Overfitting suppression variables", "Data cleaning field corrections"], 0),
      q("What curve plots True Positive Rates against False Positive Rates across classification threshold shifts?", ["ROC Curve plotting", "Linear trend axis lines", "Loss slope curve dropouts", "Sigmoid step transformation waves"], 0)
    ] 
  },
  { 
    title: "NLP", 
    category: "ai", 
    description: "Text processing, semantic analysis, and linguistic models.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What calculation objective characterizes sentiment analysis text tasks?", ["Tracking processing execution speed metrics", "Classifying underlying emotional tone within text blocks", "Correcting spelling typos dynamically", "Translating foreign document formats"], 1),
      q("What does the process of tokenization achieve within text pipelines?", ["Encrypting files securely via blockchain hashes", "Splitting raw continuous text into discrete token units", "Enforcing strict software security bounds", "Saving configuration variables to memory structures"], 1),
      q("What classification covers automated translation systems converting multi-language files?", ["File backup compression systems", "Machine Translation linguistics", "Audio waveform recording tools", "Static image layout generation"], 1),
      q("What operational task describes a semantic chatbot configuration?", ["Injecting systems with hidden virus scripts", "Conversational AI text interactions with human users", "Scanning local directories for file formats", "Building asset files for standalone browser loops"], 1),
      q("What engineering transformation governs automated speech-to-text systems?", ["Automating physical keyboard typing outputs", "Acoustic signal transcription down to text strings", "Configuring custom microphone hardware switches", "Writing static string backups to disk files"], 1),
      q("Which NLP normalization step simplifies word variations down to true dictionary roots?", ["Lemmatization procedures", "Tokenization character divisions", "Binary encoding steps", "Vector coordinate scaling mappings"], 0),
      q("What term frequency scoring matrix weights text uniqueness values over extensive document collections?", ["TF-IDF weighting matrix", "SHA-256 cryptographic hashes", "EVM memory address tracks", "Decision node conditional filters"], 0),
      q("What capability tracks the core industry text process named NER?", ["Named Entity Recognition", "Neural Energy Route mapping", "Network Entry Request filtering", "Node Error Resolver operations"], 0),
      q("Which classic open-source Python library provides foundational toolsets for NLP text cleaning?", ["NLTK library", "Pandas dataframe toolkit", "Django web application framework", "Matplotlib graphic engine"], 0),
      q("What linguistic modeling concept extracts contiguous sequences of N items from text lines?", ["N-grams sequence tracking", "Vector space embedding arrays", "Regex character search matching", "Token syntax tree parsing"], 0),
      q("Which foundational model layout couples deep encoder and decoder blocks via attention links?", ["The Transformer Architecture", "The Linear Regression tracking line", "The K-Means clustering algorithm", "The Single Perceptron layout step"], 0),
      q("What preprocessing step strips common filler words like 'and', 'the', and 'is' from text pipelines?", ["Stop Word Removal cleaning", "Tokenization text division routines", "Vector Embedding matrix coordinate matching", "Lemmatization dictionary word roots extraction"], 0),
      q("What early neural word representation architecture was deployed by Google to map semantic word similarities?", ["Word2Vec mapping tool", "GPT generative network", "BERT deep encoder layout", "Claude conversational system"], 0),
      q("What baseline NLP classification task categorizes text components as nouns, verbs, or adjectives?", ["Part-of-Speech (POS) Tagging", "Token count metric logging", "Dataframe series transformation structuring", "Text cleaning format corrections"], 0),
      q("What neural network variety loops internal memory states to track sequence contexts over timeline files?", ["Recurrent Neural Network (RNN)", "Convolutional Neural Network (CNN)", "Artificial Neural Network standard", "Multilayer Perceptron array"], 0),
      q("Which Google language model architecture processes text contexts bi-directionally across transformers?", ["BERT architecture", "GPT-2 generative layout", "Llama open model foundation", "Word2Vec semantic mapping matrix"], 0),
      q("What linguistic processing step links pronouns to their respective true noun entities in text strings?", ["Coreference Resolution tracking", "Stemming truncation shortcuts", "Tokenization character splits", "Syntax parsing mapping branches"], 0),
      q("Which generative configuration determines model word predictions one token at a time sequentially?", ["Autoregressive Decoder loop", "Convolutional filtering window", "Linear matrix transformation slope", "Max pooling data compression filter"], 0),
      q("What metric judges cross-language document classification systems matching precision target scores?", ["F1-Score metric balancing", "Gas unit consumption measurements", "Memory access speed thresholds", "Network ping delay performance index"], 0),
      q("What task matches real-time customer support chat text lines to defined corporate action intents?", ["Intent Classification categorization", "Tokenization sequence structuring", "Lemmatization root extractions", "Stemming word character cuts"], 0)
    ] 
  },
  { 
    title: "AI Ethics", 
    category: "ai", 
    description: "AI safety, alignment, systemic bias, and governance frameworks.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What concept describes systems matching or exceeding human performance markers across all tasks?", ["Artificial General Intelligence (AGI)", "Linear parameter shift frameworks", "Narrow localized AI modeling", "Decision tree data groupings"], 0),
      q("What core objective guides the machine learning subfield called AI Alignment?", ["Aligning code spacing styles cleanly", "Ensuring neural actions match human intents safely", "Configuring custom CSS flexbox elements", "Debugging database migration scripts"], 1),
      q("What term categorizes synthetic media formats where human faces or voices are altered realistically?", ["Deepfake media assets", "Encrypted cryptographic data signatures", "Circulating web token protocols", "Static image placeholder layouts"], 1),
      q("What focus prioritizes making opaque neural decision pathways clear and traceable to human review?", ["Explainable AI (XAI) transparent systems", "Black Box hidden logic algorithms", "Data encryption standard protocols", "Database web index search mining"], 1),
      q("What classic benchmark gauges machine systems based on their ability to mimic human text conversations seamlessly?", ["The Turing Test", "The Battery endurance trial", "The Hardware latency track", "The Memory capacity configuration step"], 1),
      q("What systemic bias variant originates from using historical training datasets that exclude specific demographics?", ["Data Bias / Sampling Bias", "Algorithmic Drift variations", "Hardware device processing errors", "CSS layout configuration failure"], 0),
      q("What risk profiles describe automated multi-step AI agents prioritizing resource acquisition to hit targets?", ["Instrumental Convergence hazards", "Overfitting statistical conditions", "Gradient descent convergence delays", "Token count allocation cuts"], 0),
      q("Which global entity enacted a far-reaching comprehensive legal framework regulating AI systems?", ["The European Union (EU AI Act)", "The ICANN domain governance registry", "The W3C internet styling consortium", "The IEEE electronics hardware association"], 0),
      q("What systemic issue describes automated predictive models reinforcing preexisting socioeconomic inequalities?", ["Algorithmic Bias reinforcement", "Hardware throughput latency limitations", "Database schema record nesting faults", "File type compatibility issues"], 0),
      q("What cybersecurity exploit family feeds targeted deceptive inputs into models to bypass security configurations?", ["Adversarial Attacks on models", "Phishing link email attachments", "SQL Injection terminal vectors", "DDoS network routing overloads"], 0),
      q("What engineering technique inserts calculated mathematical noise into data arrays to protect user privacy?", ["Differential Privacy standards", "Tokenization character split pipelines", "Gradient descent parameter adjustments", "Vector space embedding coordinate shifts"], 0),
      q("What main operational trait identifies an algorithm as a 'Black Box' model?", ["Opaque internal decision logic trace paths", "Open-source codebase access repositories", "Simple step-by-step conditional statements", "Tabular database grid text interfaces"], 0),
      q("What primary legal debate explores copyright frameworks hosting generative foundation models?", ["Fair Use principles and licensing structures", "Model execution speed parameters index", "GPU memory leakage tracking flags", "CSS responsive formatting layout rules"], 0),
      q("What evaluation protocol uses security engineers to intentionally stress-test models for harmful outputs?", ["Red Teaming procedures", "Unit compilation syntax checks", "Beta software release tests", "System formatting reset setups"], 0),
      q("What human cognitive error describes user over-reliance on inaccurate automated output suggestions?", ["Automation Bias error", "Tokenization character separation fault", "Memory leakage trace error logs", "Cloud server connection overload"], 0),
      q("What oversight model demands continuous human validation checkpoints over critical automated neural workflows?", ["Human-in-the-loop governance architecture", "Autonomous unmonitored tracking configurations", "Deep internal neural optimization loops", "Token baseline filtering algorithms"], 0),
      q("What fairness metric aims to equalize positive classification outcome percentages across separate demographic subgroups?", ["Demographic Parity balancing", "Raw classification accuracy indexing", "F1 score optimization targets", "Loss convergence tracking slopes"], 0),
      q("What risk outlines models consuming their own synthetic outputs over generations, leading to quality degradation?", ["Model Collapse / Data Autophagy", "Overfitting data variance states", "Vanishing gradient training errors", "Hyperparameter parameter shifts"], 0),
      q("What practice focuses on verifying data provenance before feeding web files to AI model loops?", ["Data Provenance Auditing", "Client CSS layout adjustments", "Server port configurations updates", "Code file compilation compression"], 0),
      q("What framework mandates labeling text, image, or video outputs explicitly as machine-generated assets?", ["AI Watermarking / Provenance disclosure", "Tokenization logging setups", "Database index creation rules", "Asymmetric key storage schemas"], 0)
    ] 
  },
  { 
    title: "Neural Networks", 
    category: "ai", 
    description: "Deep learning architectures, weights, layers, and optimization.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What fundamental element processes mathematical node inputs within artificial neural networks?", ["An artificial neuron / Node unit", "A physical hardware wire module", "A screen pixel grid display element", "A storage data cell layout table"], 1),
      q("What mechanism calculates model error derivatives backwards to recalibrate layer variables?", ["Backpropagation optimization loop", "Linear search routing functions", "Array element mapping formulas", "Hash ring network directory trees"], 1),
      q("What component determines the scalar output threshold of a node using non-linear math maps?", ["Activation Function algorithms", "System power control protocols", "Application login verification gates", "Compiler initialization scripts"], 1),
      q("What layer acts as the initial data entry boundary for feature values inside a neural network?", ["The Input Layer grid", "The hidden layer buffer area", "The database persistence table", "The browser view styling container"], 1),
      q("What variable modifies the relational strength of connections between nodes across layer stacks?", ["Connection Weights variables", "Hardware processing speed limits", "Token market cost parameters", "Array index indexing counters"], 1),
      q("Which activation function limits numeric outputs between 0 and 1 like probability indicators?", ["Sigmoid Function mapping", "ReLU step function threshold", "Linear continuous trend slopes", "Step condition node logic"], 0),
      q("Which neural architecture layout uses specialized filtering windows optimized for spatial image processing?", ["Convolutional Neural Network (CNN)", "Recurrent sequence network setup", "Long Short-Term Memory layout", "Transformer attention block system"], 0),
      q("What issue arises when training error derivatives shrink to absolute zero across deep layer steps?", ["Vanishing Gradient Problem", "Overfitting data variance scenarios", "Exploding validation bias drift", "Dead node logic loop traps"], 0),
      q("Which non-linear function forces all negative coordinate values straight to zero?", ["Rectified Linear Unit (ReLU)", "Sigmoid activation curve", "Hyperbolic Tangent (Tanh) function", "Softmax classification mapping"], 0),
      q("What structural layers sit positioned safely between the input boundaries and output nodes?", ["Hidden Layers of the network", "Data backup caching structures", "System configuration root paths", "Tabular database sequence lists"], 0),
      q("What layer type condenses spatial feature matrices inside CNN image processing tracks?", ["Max Pooling / Pooling Layer", "Dense fully connected node row", "Input raw attribute matrix line", "Weight parameter scale track"], 0),
      q("What classic regularization strategy deactivates random node arrays during training to mitigate overfitting?", ["Dropout regularization", "Batch Normalization alignment", "Network layer pruning filters", "Fuzz testing input validation"], 0),
      q("Which popular optimization model adds adaptive momentum vectors to accelerate loss convergence?", ["Adam Optimizer algorithm", "Linear translation shift steps", "Brute force search iterations", "Random index array guessing"], 0),
      q("Which multi-class activation function scales outputs into a true probability distribution totaling exactly 1?", ["Softmax function mapping", "ReLU activation threshold", "Sigmoid scale curve", "Hyperbolic Tangent function"], 0),
      q("What deep sequence variant uses input, forget, and output gates to retain long-term contextual steps?", ["LSTM (Long Short-Term Memory)", "Single layer perceptron node", "Branching classification decision tree", "Linear node index step track"], 0),
      q("What operation normalizes activation levels across hidden layer batches to stabilize deep training paces?", ["Batch Normalization formatting", "Token processing text cleaning", "Dataframe schema transformation layout", "Weight scale adjustment bounds"], 0),
      q("What dual-model setup structures a generator and a discriminator network competing to output realistic synthetic assets?", ["Generative Adversarial Network (GAN)", "Convolutional image mapping grid", "Recurrent timeline sequence tracking", "Transformer attention block array"], 0),
      q("What architectural benchmark represents the absolute simplest single-layer artificial neural layout?", ["The Perceptron model layout", "The Transformer block stack", "The Decision tree leaf module", "The Vector array database row"], 0),
      q("What modifier constant shifts activation function curves horizontally independent of incoming feature inputs?", ["Bias value constants", "Weight relational scales", "Epoch loop execution numbers", "Learning speed acceleration multipliers"], 0),
      q("What terminology describes a complete training pass over every single available sample within a dataset?", ["An Epoch milestone", "A batch sizing selection step", "A model convergence target", "A gradient computation derivative"], 0)
    ] 
  },

  // ==========================================
  // 3. CYBERSECURITY (5 Quizzes, 20 Questions Each)
  // ==========================================
  { 
    title: "Network Defense", 
    category: "cybersecurity", 
    description: "Perimeter controls, firewalls, and industrial intrusion detection.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What is the primary role of a digital network firewall firewall?", ["Encrypting files on hard drives", "Filtering traffic based on security rules", "Speeding up browser download pipelines", "Generating random user account credentials"], 1),
      q("What does a Distributed Denial of Service (DDoS) attack seek to cause?", ["Stealing local files cleanly", "Overwhelming systems to crash services", "Formatting database hard drives", "Modifying application style layouts"], 1),
      q("What encryption benefit does a Virtual Private Network (VPN) provide?", ["Extending database disk volumes", "Building secure tunnels over public paths", "Compiling application source files faster", "Checking user login credentials schemas"], 0),
      q("What occurs when an attacker executes address or identity spoofing?", ["Accelerating network routing tracks", "Faking sender data to mask malicious origins", "Deleting old server configuration traces", "Copying static code files to local drives"], 1),
      q("What primary function does a network router handle across standard subnets?", ["Displaying user dashboard interfaces", "Directing data payloads between network chains", "Storing application access tokens", "Hosting relational database tables"], 1),
      q("Which security module logs, tracks, and raises security alert triggers on suspicious perimeter trends?", ["Intrusion Detection System (IDS)", "Forward Proxy caching device", "Network Switch connection node", "Centralized hardware hub layout"], 0),
      q("Which design architecture operates under the assumption that no internal network zone is inherently safe?", ["Zero Trust Architecture (ZTA)", "DMZ buffer perimeter setup", "Standard VPN gateway tunnel", "Local corporate Intranet configuration"], 0),
      q("What port standard handles encrypted, secure hyper-text web traffic routing?", ["HTTPS Port 443 standard", "HTTP Port 80 clear text routing", "FTP Port 21 data transfer link", "SSH Port 22 secure command line"], 0),
      q("What isolation strategy splits corporate network zones to prevent lateral threat movements?", ["Network Segmentation design", "Synchronous data replication tasks", "Local directory purging steps", "Hard drive formatting procedures"], 0),
      q("What trap system mimics vulnerable corporate servers to lure and study active hackers safely?", ["A Honeypot system trap", "Active Directory domain controllers", "Proxy routing cache nodes", "Root folder system directories"], 0),
      q("What port standard handles encrypted Secure Shell (SSH) remote command terminal access?", ["Port 22 tracking link", "Port 23 unencrypted Telnet line", "Port 25 SMTP mail routing paths", "Port 53 DNS nameserver queries"], 0),
      q("Which open-source application functions globally as a detailed network packet analysis utility?", ["Wireshark packet analyzer", "Metasploit exploit workbench", "Nmap network mapper utility", "Burp Suite web interception proxy"], 0),
      q("What directory management framework enforces global user permission parameters across corporate network nodes?", ["Active Directory (AD) / IAM system", "SQL database index container", "Firewall rules lookup matrix", "DNS nameserver lookup directory"], 0),
      q("What network security utility maps active network nodes and catalogs open ports?", ["Nmap security scanner", "Ping baseline command utility", "Wireshark data packet viewer", "Express router code controller"], 0),
      q("What proxy device buffers incoming external web traffic before routing it to internal server arrays?", ["Reverse Proxy system buffer", "Ethernet switch connection node", "Hardware hub routing adapter", "Static hyper-link redirection path"], 0),
      q("What network protocol framework implements native payload encryption directly across the IP layer?", ["IPsec protocol framework", "TLS transport encryption standard", "FTP file transmission setup", "DNSSEC domain record verification"], 0),
      q("What terminology describes a botnet command cluster launching synchronization flood attacks?", ["DDoS botnet attack vector", "Phishing link email distribution", "SQL Injection data script loop", "Buffer overflow memory stack breach"], 0),
      q("What perimeter sub-network bridges public internet spaces while isolating internal local area networks?", ["DMZ (Demilitarized Zone)", "Local network subnet boundary", "Cloud hosting virtualization space", "Core gateway network adapter"], 0),
      q("What advanced firewall framework drops or permits traffic by tracking the active conversation states of connections?", ["Stateful Inspection Firewall", "Static stateless packet filter", "Hub adapter switch hardware", "Proxy caching interface tunnel"], 0),
      q("What network component translates friendly web domain text paths straight to numeric system IP addresses?", ["DNS (Domain Name System)", "HTTP protocol routing layer", "DHCP dynamic assignment servers", "BGP border path configuration routers"], 0)
    ] 
  },
  { 
    title: "Malware", 
    category: "cybersecurity", 
    description: "Malicious payload classifications, reverse engineering, and signatures.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What payload action defines a standard ransomware infection?", ["Distributing free web trial apps", "Encrypting system files to demand money", "Accelerating hard drive performance speed", "Creating alternative browser video games"], 1),
      q("What delivery tactic characterizes a malicious Trojan Horse payload?", ["Self-replicating across networks instantly", "Masking malware inside benign-looking files", "Enforcing strict folder security parameters", "Optimizing code execution runtimes dynamically"], 1),
      q("What surveillance objective drives spyware malware infections?", ["Configuring system webcam hardware frames", "Exfiltrating sensitive user logging data covertly", "Generating randomized graphic profile images", "Formatting system file logs automatically"], 1),
      q("What exact functionality handles a dedicated keylogger tracking program?", ["Fixing system dictionary typo glitches", "Recording physical keyboard keystroke events", "Counting total words typed across screens", "Interfering with online video game loops"], 1),
      q("What role defines signature-based anti-malware tracking utilities?", ["Spreading test viruses to check loops", "Matching file hashes against known threat definitions", "Building local network browser tools", "Clearing browser cache directories"], 1),
      q("Which malware class self-replicates across interconnected network chains without requiring human file execution?", ["Worm malware variants", "Trojan horse software packages", "Spyware data loggers", "Adware browser extension tools"], 0),
      q("What covert infection layer intercepts privileged core execution levels before the OS finishes booting?", ["Rootkit system exploit", "Keylogger surveillance script", "Macro document exploit loops", "Phishing redirection automation"], 0),
      q("What execution rule triggers a dynamic logic bomb malware attack vector?", ["A defined timeline calendar date or condition met", "The deletion of random system logs", "A standard website access ping drop", "A basic file format transformation task"], 0),
      q("What isolated virtual playground allows security engineers to safely unpack and study active malware?", ["A Sandbox analysis space", "A production server live deployment", "A public application package registry", "A standard browser window runtime"], 0),
      q("What characteristic behavior identifies polymorphic malware configurations?", ["Using identical static signature structures globally", "Changing file code structures dynamically to evade hashes", "Converting rich text files to plain scripts", "Looping macro statements inside office spreadsheets"], 1),
      q("What malware strain hooks script execution features straight inside office documents like Excel or Word?", ["Macro Malware variables", "Rootkit kernel modification scripts", "DDoS network botnet scripts", "SQLi terminal injection parameters"], 0),
      q("What cryptographic practice hides malicious payload strings inside clean image pixel data channels?", ["Steganography procedures", "Buffer overflow stack exploits", "Brute force word list scripts", "Port scanning network mapping"], 0),
      q("What infrastructure servers guide, command, and retrieve logs from distributed zombie botnets?", ["Command and Control (C2) Servers", "Forward Proxy caching arrays", "Relational database server nodes", "Local hardware firewall gateways"], 0),
      q("What software category forcefully redirects browser sessions to show intrusive pop-up advertisements?", ["Adware tracking modules", "Rootkit kernel payload packages", "Logic bomb calendar scripts", "Network replication worm systems"], 0),
      q("What reverse engineering process translates compiled binary assets back into readable assembly code instructions?", ["Disassembly / Decompilation procedures", "Static source code compilation checks", "System hard drive resetting setups", "Tokenization sequence parsing steps"], 0),
      q("What specific category tracks file-locking exploits utilizing asymmetric crypto algorithms?", ["Crypto-Ransomware file locks", "Spyware data extraction tools", "Worm network replication paths", "Trojan backdoors hidden inside code"], 0),
      q("What exploit utilizes compromised system CPU/GPU clusters to mine cryptocurrency covertly for attackers?", ["Cryptojacking malware systems", "Keylogger hardware monitoring scripts", "Phishing email document scams", "Adware monetization link systems"], 0),
      q("What analytical technique tracks unknown malware files by monitoring real-time system process alterations?", ["Behavioral / Heuristic Analysis", "Static file signature hash checking", "File name extension confirmation checks", "Port address configuration scanning"], 0),
      q("What advanced threat classification covers state-sponsored hacking syndicates executing prolonged network intrusions?", ["Advanced Persistent Threat (APT)", "Basic script kiddie automation loops", "Adware browser extension tracking layers", "Accidental local user directory deletions"], 0),
      q("What method safely neutralizes identified malware indicators across endpoint nodes?", ["Quarantine and Removal isolation", "Changing network adapter IP addresses", "Replicating target files over cloud drives", "Recompiling local code projects from scratch"], 0)
    ] 
  },
  { 
    title: "Social Eng", 
    category: "cybersecurity", 
    description: "Human vulnerability modeling, deceptive vectors, and credential harvesting.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What delivery avenue defines a standard email phishing scheme?", ["Catching real fish over water networks", "Using deceptive emails to harvest credentials", "Typing terminal scripts into databases", "Building responsive web application components"], 1),
      q("What social engineering method builds complex fake scenarios to trick victims into revealing data?", ["Pretexting strategy alignments", "Reading raw text files manually", "Compiling software codebase updates", "Saving data indices to memory tables"], 1),
      q("What manipulation strategy uses infected storage drives left in public paths to compromise systems?", ["Baiting techniques", "Tailgating entry patterns", "Mass email spam distribution", "TV broadcasting ad networks"], 0),
      q("What physical breach pattern describes following authorized personnel straight through secure office entrances?", ["Tailgating / Piggybacking actions", "Driving vehicle units safely to work", "Copying access badge files digitally", "Logging access histories manually"], 0),
      q("What acronym standard adds dynamic verification steps alongside classic passwords?", ["MFA (Multi-Factor Authentication)", "JSON file model parsing keys", "CSS rendering canvas layout parameters", "Node application script dependency maps"], 0),
      q("Which social engineering tier focuses exclusively on high-value corporate executives like CEOs?", ["Whaling target campaigns", "Smishing mobile text vectors", "Vishing voice phone interactions", "Baiting physical hardware drops"], 0),
      q("What technical pathway delivers deceptive smishing attack packages?", ["Fraudulent SMS / Mobile text strings", "Voice over IP telephone channels", "Corporate executive phishing frameworks", "Physical USB stick drops in facilities"], 0),
      q("What voice manipulation method uses spoofed phone connections to extract banking verification codes?", ["Vishing voice schemes", "Smishing text setups", "Whaling executive targeting", "Tailgating badged office entries"], 0),
      q("What visibility technique monitors users typing credentials from close proximity?", ["Shoulder Surfing observations", "Pretexting social alignments", "Baiting physical storage drops", "Dumpster diving document searching"], 0),
      q("What structural human trigger forces hurried errors by manufacturing artificial countdown boundaries?", ["Urgency / Scarcity manipulation", "Authority verification cues", "Social consensus trust triggers", "Liking and brand alignment metrics"], 0),
      q("What domain hijacking trick diverts valid web search traffic to clone sites via router DNS alterations?", ["Pharming network redirection", "Vishing phone interaction loops", "Tailgating physical entrance breaches", "Baiting unvetted storage device keys"], 0),
      q("What physical recovery technique inspects office waste arrays to locate unshredded passwords?", ["Dumpster Diving data collection", "Tailgating facility access steps", "Phishing email layout checking", "Pretexting scenario creation setups"], 0),
      q("What identity trick loops company title representations to bypass entry confirmation checks?", ["Impersonation tactics", "Tailgating security turnstiles", "Dumpster diving waste checks", "Shoulder surfing credential views"], 0),
      q("What protocol triad helps verify email sender domain integrity to filter phishing spam?", ["SPF / DKIM / DMARC domain records", "CSS visual style sheet confirmation codes", "Express application routing middleware links", "NoSQL database primary index configurations"], 0),
      q("What compromise dynamic trades a fake reward or tech support service for system entry privileges?", ["Quid Pro Quo exchanges", "Tailgating badge gate entries", "Shoulder surfing terminal lookups", "Dumpster diving disposal analyses"], 0),
      q("What physical perimeter setup prevents tailgating by locking visitors inside dual-door checking chambers?", ["Mantraps / Security turnstile arrays", "Open concept lobby waiting zones", "Static text terminal passwords", "Software perimeter firewall rules"], 0),
      q("What corporate defensive protocol trains workforces to identify and isolate psychological engineering vectors?", ["Security Awareness Training programs", "Port address script adjustments", "Database indexing maintenance tasks", "Asset file size reduction strategies"], 0),
      q("What principle mandates giving employees only the absolute minimum system clearance necessary to perform tasks?", ["The Principle of Least Privilege (PoLP)", "Multi-factor authentication setups", "Asymmetric encryption key workflows", "Zero-day vulnerability testing routines"], 0),
      q("What social engineering vector leverages fake job listings on career grids to compromise professional targets?", ["Employment / LinkedIn phishing vectors", "DDoS command botnet scripts", "SQL database index query injections", "Local folder directory navigation errors"], 0),
      q("What psychological trigger exploits the human tendency to comply when an attacker mimics law enforcement officials?", ["Authority validation cues", "Scarcity countdown timelines", "Social liking affinity markers", "Consensus validation metrics"], 0)
    ] 
  },
  { 
    title: "Cryptography", 
    category: "cybersecurity", 
    description: "Symmetric and asymmetric primitives, hash functions, and key exchanges.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What transformation objective describes cryptographic encryption setups?", ["Deleting system backup directories completely", "Scrambling clear plaintext down to unreadable cipher text", "Printing formatting variables to console lines", "Sorting array lists into explicit chronological indexes"], 1),
      q("What primary function does a public key handle within asymmetric key pairs?", ["Locking / Encrypting data payloads securely", "Functioning as a shared symmetric secret key", "Bypassing password login verification steps", "Hosting local server configuration files"], 0),
      q("What structural output characteristic defines a mathematical hash function?", ["A variable length text array string", "A fixed-length deterministic data fingerprint", "A volatile memory state tracking counter", "A malicious payload virus script loop"], 1),
      q("What security layer standard handles historical secure website communication pathways?", ["SSL / TLS security standard", "Speed optimization tracking networks", "Standard system login route modules", "Local browser caching configurations"], 0),
      q("What methodology drives a standard brute force cryptographic password attack?", ["Using muscle power to break terminal assets", "Iterating through every possible key choice systematically", "Relying on search engines to look up codes", "Flooding cloud web servers with traffic drops"], 1),
      q("Which algorithmic block cipher standard handles secure symmetric bulk data encryption globally?", ["AES standard cipher", "RSA asymmetric factorization", "MD5 weak hashing algorithm", "Diffie-Hellman key routing exchange"], 0),
      q("Which operational framework uses separate paired public and private keys to manage security boundaries?", ["Asymmetric Cryptography architecture", "Symmetric shared cipher maps", "Hash validation checking loops", "Base64 text character encoding blocks"], 0),
      q("What calculation pattern converts plaintext data using a single shared secret key for both steps?", ["Symmetric Encryption procedures", "Asymmetric key pair mappings", "Hashing block indexing models", "Public key exchange handshakes"], 0),
      q("What key negotiation standard allows separate entities to generate shared symmetric keys across public lines securely?", ["Diffie-Hellman Key Exchange protocol", "MD5 cryptographic hashing loops", "RSA public key text encryption steps", "Base64 data serialization layouts"], 0),
      q("What vulnerability occurs when distinct data inputs produce matching hash outputs?", ["A cryptographic Hash Collision event", "An encryption boundary validation leak", "A brute force word list authentication success", "A symmetric key mismatch failure"], 0),
      q("Which formatting layout standard underpins public key infrastructure web security certificates?", ["X.509 PKI certificate standard", "SQL structural table index grid", "ERC-20 token interface codebase", "JSON multi-dimensional data array"], 0),
      q("What randomized string asset is combined with passwords prior to hashing to defeat rainbow tables?", ["Cryptographic Salt values", "Pepper application constants", "Nonce dynamic transaction markers", "Initialization Vector (IV) parameters"], 0),
      q("What classic asymmetric cipher bases its security guarantees on the extreme difficulty of prime factorization?", ["RSA cipher standard", "AES-256 block module", "SHA-3 hashing algorithm", "Blowfish legacy cipher configuration"], 0),
      q("What security benchmark guarantees that a digital signature creator cannot disavow originating the message?", ["Non-repudiation assurances", "Data confidentiality boundary controls", "System uptime availability parameters", "Blockchain immutability ledger properties"], 0),
      q("What system manages, registers, validates, and handles public security certificate revokings?", ["PKI (Public Key Infrastructure)", "Active Directory user credential pools", "NoSQL database clustering layers", "Express web server router adapters"], 0),
      q("What modern asymmetric paradigm implements robust security targets using smaller key sizes than legacy RSA?", ["ECC (Elliptic Curve Cryptography)", "AES-GCM encryption modules", "MD5 check validation matrices", "DES legacy block cipher formats"], 0),
      q("What attack configuration utilizes extensive precomputed hash index tables to uncover passwords?", ["Rainbow Table Attack strategies", "Brute force scripting execution tracks", "SQL Injection terminal data vectors", "Man-in-the-Middle network path interceptions"], 0),
      q("What core operational rule keeps old session data safe if a master private key leaks down the line?", ["Perfect Forward Secrecy (PFS) standards", "Symmetric cipher block padding configurations", "MD5 data integrity verification loops", "Base64 text string decoding operations"], 0),
      q("What basic cipher translates text data by shifting characters down alphabetical lines by a fixed offset?", ["Caesar Cipher encryption shortcut", "AES-256 advanced block processing", "RSA prime number computational matrices", "SHA-512 deep hash processing systems"], 0),
      q("What processing speed trait separates symmetric ciphers from asymmetric key pair algorithms?", ["Symmetric encryption executes significantly faster", "Asymmetric encryption maps massive files quicker", "Symmetric operations demand double the memory space", "Asymmetric keys operate entirely without processor chips"], 0)
    ] 
  },
  { 
    title: "Web Sec", 
    category: "cybersecurity", 
    description: "OWASP Top 10 vulnerabilities, session handling, and application protection.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What malicious intervention defines a standard SQL Injection (SQLi) exploit?", ["Updating server operating system software versions", "Injecting arbitrary database query strings via input fields", "Backing up server data configurations to cloud drives", "Optimizing data search indexing retrieval speeds"], 1),
      q("What does the core industry vulnerability acronym XSS stand for?", ["Cross-Site Scripting exploits", "Extensible System Scaling parameters", "XML Security Schema validation steps", "Execution Speed Synchronization delays"], 0),
      q("What web application component acts as a local browser tracking token for active user sessions?", ["A local HTTP cookie tracking asset", "A server-side file backup system", "A variable development name reference", "An application code bug trace file"], 1),
      q("What communication status guarantees a website operates over encrypted transit lines?", ["The HTTPS protocol configuration layer", "A condensed minimized file layout setup", "A high performance processing infrastructure tier", "A hyperactive script compilation track"], 1),
      q("What automated check challenges web visitors to prove they are humans rather than automated script bots?", ["A CAPTCHA challenge mechanism", "An online arcade game interface component", "An automated file downloading background loop", "A configuration file saving procedure link"], 1),
      q("What exploit forces authenticated browsers to dispatch malicious requests to trusted web apps silently?", ["CSRF (Cross-Site Request Forgery)", "SQL Injection query insertions", "XSS malicious script loops", "Buffer Overflow memory stack overflows"], 0),
      q("Which Cross-Site Scripting variant saves harmful script payloads permanently inside backend databases?", ["Stored XSS / Persistent XSS exploits", "Reflected non-persistent XSS script loops", "DOM-based client browser script executions", "Blind SQL database injection vectors"], 0),
      q("What fundamental secure coding practice stops injection attacks by decoupling input strings from query interpretation?", ["Input Sanitization & Parameterized Queries", "CSS visual layout styling adjustments", "Database replication cluster synchronizations", "Client javascript file asset minification steps"], 0),
      q("What browser security header mitigates script injection risks by explicitly restricting authorized resource loading origins?", ["Content Security Policy (CSP) headers", "Access-Control-Allow-Origin parameters", "User-Agent client identifier strings", "Strict-Transport-Security transport headers"], 0),
      q("What vulnerability tracks application input gaps letting hackers navigate back to server system files?", ["Path Traversal / Local File Inclusion (LFI)", "XSS script insertion loop checkpoints", "CSRF payload execution form fields", "Cookie session timeout parameter configurations"], 0),
      q("What security flag prevents browser-side javascript commands from inspecting session cookies?", ["The HttpOnly Cookie Flag configuration", "The Secure Cookie Flag indicator", "The SameSite Cookie attribute setting", "The local Domain boundary rule definition"], 0),
      q("What baseline token architecture protects web form operations from Cross-Site Request Forgery vulnerabilities?", ["Anti-CSRF Cryptographic Tokens", "JWT bearer token authorization headers", "Standard session tracking cookie strings", "Database collection primary index keys"], 0),
      q("What web exploit targets applications parsing untrusted XML inputs to query local server file systems?", ["XXE (XML External Entity) Injection", "SQL Injection structural data queries", "Stored XSS persistent script injection", "Path traversal directory navigation chains"], 0),
      q("Which security application filters, monitors, and blocks malicious web traffic heading into public app endpoints?", ["WAF (Web Application Firewall)", "Reverse Proxy caching gateway architecture", "DNS nameserver lookup directory router", "Local host operating system firewall layer"], 0),
      q("What cookie property forces web browsers to transmit tracking cookies exclusively across encrypted HTTPS connections?", ["The Secure Flag parameter setting", "The HttpOnly protection flag variable", "The SameSite cross-site rule attribute", "The local server path configuration parameter"], 0),
      q("What access control vulnerability describes web APIs exposing records because internal entity ownership validation checks are missing?", ["BOLA / IDOR access control failures", "XSS visual script injection patterns", "SQL injection structural ledger queries", "CSRF cross-site token synchronization faults"], 0),
      q("What response header prevents malicious external domains from embedding web applications inside deceptive iframes?", ["The X-Frame-Options security header", "The Content-Type format indicator header", "The Cache-Control resource retention policy", "The Access-Control-Allow-Methods rule matrix"], 0),
      q("What application error occurs when web servers expose full diagnostic stack traces straight to public visitors?", ["Improper Error Handling / Information Disclosure", "SQL Injection route opening holes", "HttpOnly cookie variable configurations", "CSRF token validation mismatches"], 0),
      q("Which proxy utility helps security testers intercept, inspect, and modify HTTP requests passing between browsers and backends?", ["Burp Suite / OWASP ZAP proxy tools", "Nmap network topology mapping scanners", "Wireshark data packet logging software", "Node package manager distribution networks"], 0),
      q("What OWASP security classification tracks systems running outdated software dependencies or open debug routes?", ["Security Misconfiguration vulnerabilities", "XSS payload cross-site vulnerabilities", "CSRF request verification failures", "SQL injection structural query errors"], 0)
    ] 
  },

  // ==========================================
  // 4. DEVELOPMENT (5 Quizzes, 20 Questions Each)
  // ==========================================
  { 
    title: "React", 
    category: "development", 
    description: "Component lifecycle, state primitives, hooks, and optimization structures.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What syntax standard represents the template formatting named JSX?", ["A dynamic automotive fuel rail system", "A syntax extension mixing JavaScript with XML/HTML", "A programming language built to replace Java", "A structural variation of JSON data arrays"], 1),
      q("What capability does the built-in React useState hook provide?", ["Injecting custom inline CSS style rules", "Managing local component state variables", "Configuring single page browser application routers", "Establishing persistent database server pipelines"], 1),
      q("What architectural concept defines a component within a modern web framework framework?", ["An isolated, reusable piece of user interface logic", "A specific server network cable interface line", "An external application file format extension", "A decorative vector graphics asset file"], 0),
      q("What operational trick describes the React Virtual DOM system?", ["An immersion virtual reality interface framework", "An in-memory lightweight representation of the real DOM", "A cloud computing infrastructure hosting option", "An online multiplayer video game canvas element"], 1),
      q("What role do Props fulfill across component hierarchies?", ["Providing movie staging items to developers", "Passing configuration inputs down from parent components", "Updating internal mutable state variables locally", "Enforcing global CSS utility styling configurations"], 1),
      q("Which core hook handles side-effects like data fetching and subscription listeners inside functional components?", ["The useEffect hook module", "The useState state primitive hook", "The useMemo evaluation caching hook", "The useContext global provider hook"], 0),
      q("Which React performance hook optimizes renders by caching computed heavy mathematical outputs?", ["The useMemo optimization hook", "The useCallback function caching hook", "The useRef mutable value tracking hook", "The useEffect dependency execution hook"], 0),
      q("What special attribute must be added to list elements rendered from arrays to stabilize render tracking?", ["The unique 'key' attribute field", "The database object ID indicator", "The local array iteration index position", "The global HTML class naming selector"], 0),
      q("Which hook reads values from global React Context provider scopes directly inside components?", ["The useContext authorization hook", "The useReducer action processing hook", "The useState component state primitive", "The useRef mutable reference hook"], 0),
      q("Which state Hook coordinates complex multi-step state variations using a dispatch action pattern?", ["The useReducer complex state hook", "The useState baseline component state hook", "The useCallback function preservation hook", "The useEffect operational life-cycle hook"], 0),
      q("Which hook holds a mutable object that persists across component re-renders without triggering a view update?", ["The useRef persistence hook", "The useState rendering trigger hook", "The useMemo calculation caching hook", "The useLayoutEffect synchronous layout hook"], 0),
      q("What higher-order wrapper prevents functional components from re-rendering if incoming prop references remain identical?", ["The React.memo structural optimization wrapper", "The useCallback function optimization hook", "The useState component lifecycle hook", "The underlying Virtual DOM node tree link"], 0),
      q("Which library standard orchestrates single-page routing flows across client-side React architectures?", ["The React Router library system", "The Express backend routing framework", "The Redux global state ecosystem", "The Tailwind configuration file architecture"], 0),
      q("Which global state library architecture operates as a centralized external store tank for cross-component access?", ["Redux / Zustand store management frameworks", "Context API local provider wrappers", "Local component state tracking variables", "Props drilling patterns cascading down blocks"], 0),
      q("What lifecycle phase occurs when a React component is initially rendered and added to the real web DOM?", ["The Mounting phase sequence", "The Updating phase transition tracking", "The Unmounting clean-up sequence step", "The Memoization processing stage loop"], 0),
      q("What advanced React mechanism renders child components into distinct DOM locations outside main parent roots?", ["React Portals transport mechanisms", "Virtual DOM internal branching paths", "Higher-Order component wrapper filters", "State context provider boundary scopes"], 0),
      q("What specific component class intercepts errors down child component lines to show fallback warning interfaces?", ["Error Boundary component filters", "Standard Javascript try-catch operational blocks", "The useEffect hook cleanup sequence tracks", "Axios central network interceptor functions"], 0),
      q("Which React layout component manages loading fallbacks alongside lazy-loaded script sub-modules?", ["The Suspense fallback wrapper component", "The Fragment empty node tag container", "The Provider global context scope node", "The Consumer context tracking template"], 0),
      q("What strict condition governs where React hook hooks can be legally initialized?", ["Call hooks exclusively at the top level of functions", "Call hooks inside local conditional evaluation blocks", "Call hooks within standard javascript loop structures", "Call hooks straight inside classic ES6 code classes"], 0),
      q("Which empty tag notation groups multi-element list sets without inserting unneeded layout nodes into the DOM?", ["React Fragments (<>...</>)", "Standard division block tags (<div>)", "Structural document sections (<section>)", "Inline text grouping spans (<span>)"], 0)
    ] 
  },
  { 
    title: "NodeJS", 
    category: "development", 
    description: "Event loops, asynchronous runtimes, streaming inputs, and APIs.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What does the core environment ecosystem acronym NPM define?", ["Network Power Manager configurations", "Node Package Manager package distribution registries", "Network Port Monitor trace systems", "Node Process Multiplier parallel layers"], 1),
      q("What software category classifies the popular backend package named Express?", ["A high-speed train infrastructure controller", "A minimalist web application server framework", "A relational database storage driver package", "A local desktop web browser utility application"], 1),
      q("What role does the package.json file handle inside node projects?", ["Storing compressed app background graphics", "Managing project metadata, configuration variables, and dependencies", "Writing core backend JavaScript application files", "Logging real-time production system errors"], 1),
      q("What conceptual task defines backend application framework middleware?", ["Heavy local host operating system kernel code", "Request-response cycle interceptor handlers", "Center layout positioning parameters within web CSS", "Automated system hardware driver architectures"], 1),
      q("What capability does the classic CommonJS require() function call handle?", ["Declaring system application security boundaries", "Importing external code modules from separate files", "Searching database records for matching index patterns", "Printing real-time diagnostic text logs to screens"], 1),
      q("What single-threaded architectural runtime pattern lets Node handle non-blocking asynchronous operations?", ["The Event Loop orchestration loop", "Multi-threaded process pooling blocks", "SQL router line scheduling setups", "The V8 internal machine compilation core"], 0),
      q("What global environment variable provides access to shell deployment configurations inside running Node processes?", ["process.env variable fields", "window.env global browser variables", "global.config local asset folders", "system.variables runtime tracking frames"], 0),
      q("Which core node module exposes file system management capabilities like reading or writing files?", ["The fs (File System) core module", "The http network routing module", "The path string resolution module", "The stream buffer processing module"], 0),
      q("What term tracks functions passed as arguments to run once an asynchronous operation finishes?", ["Callback functions", "Static string constants", "Array matrix indices", "JSON configuration definitions"], 0),
      q("What coding convention dictates structuring Node callbacks to receive failure alerts safely?", ["The Error-First Callback design convention", "The Promise resolve validation pathway", "The generic try-catch block wrapping script", "The global middleware tracker interceptor"], 0),
      q("Which compiler architecture parses JavaScript down to machine-level operations inside the Node runtime?", ["The V8 Engine compilation architecture", "The SpiderMonkey browser engine layout", "The Chakra Core script processor engine", "The Rhino Java execution environment"], 0),
      q("What specialized streaming data structure handles heavy binary data block buffers efficiently in memory?", ["Buffers and Streams memory handlers", "String sequence text logging files", "JSON parsing index tree containers", "Array multi-dimensional list matrices"], 0),
      q("Which built-in utility standardizes old callback patterns into clean modern Promise architectures?", ["The util.promisify utility method", "The JSON.parse transformation parser", "The require statement dependency importer", "The npm install terminal script command"], 0),
      q("Which core module safely normalizes relative file storage paths across different operating systems?", ["The path resolution core module", "The fs module file writer module", "The url link text parser module", "The os hardware tracking module"], 0),
      q("Which Express parsing middleware processes incoming application urlencoded web forms?", ["The express.urlencoded() payload middleware", "The cors() origin enabling filter middleware", "The dotenv.config() file environment loading step", "The mongoose.model() schema registration module"], 0),
      q("Which global variable registers the absolute file system folder directory path of the active script?", ["The __dirname environment variable", "The process.cwd() current system folder execution path", "The module.exports script distribution container", "The require.resolve module utility pipeline"], 0),
      q("What boundary security architecture ensures web browsers can securely request API assets hosted on alternative domains?", ["CORS cross-origin resource sharing filters", "JWT cryptographic authentication payload verification", "SQL primary indexing column lookups", "Dotenv environment file compilation targets"], 0),
      q("Which parameter object dispatches response headers and payload outputs back to waiting network clients?", ["The res (Response object) parameter", "The req (Request object) parameter framework", "The next (Callback interceptor) pipeline connector", "The app (Express instance cluster) main interface"], 0),
      q("What terminal switch installs node dependencies while completely skipping development-only modules?", ["The npm install --production operational flag", "The npm run build asset compilation pipeline script", "The npm cache clean clear storage utility track", "The npm init -y automated initializer flag string"], 0),
      q("Which baseline class drives custom event binding, publishing, and subscription interactions inside Node modules?", ["The EventEmitter core orchestration class", "The V8 Loop compiler optimizer layer", "The FileSystem read-stream data controller", "The Stream binary buffer constructor utility"], 0)
    ] 
  },
  { 
    title: "JavaScript", 
    category: "development", 
    description: "Prototypal inheritance, scopes, closures, async flow, and array methods.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What variable constraint rule applies when declaring bindings using const?", ["The binding reference cannot be reassigned", "The contents inside objects become frozen instantly", "The variable moves automatically to global windows", "The compiler clears the variable after one loop execution"], 0),
      q("What benefit does the ES6 arrow function notation supply developers?", ["Building local mobile browser games instantly", "A concise syntax layout preserving lexical 'this' bounds", "Moving mouse cursors dynamically across client displays", "Enforcing strict CSS styling overrides across viewports"], 1),
      q("What runtime paradigm orchestrates async / await flows inside modern JS blocks?", ["Synchronous blocking code lines processing patterns", "Asynchronous Promise wrapper abstraction flows", "Deleting old script files to reset processing parameters", "Compiling high performance application graphics displays"], 1),
      q("What internal state tracks a variable that has been declared but not assigned a value?", ["The undefined primitive data state", "A broken application logic compiler bug trace", "An absolute numeric zero integer indicator", "A Boolean false value logic assessment"], 0),
      q("What data framework handles sharing properties down lineage lines inside JavaScript?", ["Prototypal Inheritance architecture chains", "Classical object-oriented code compilation loops", "Lexical tracking scopes isolation boundaries", "Asynchronous processing thread pool controllers"], 0),
      q("What terminology describes functions carrying references to outer enclosing scopes even after execution completes?", ["A Closure mechanism state", "A Hoisting variable lift cycle", "A Prototype chain structure map", "A standard Callback execution route"], 0),
      q("Which higher-order array utility returns a completely new array populated with transformed data?", ["The array.map() transformation method", "The array.forEach() baseline iterator command", "The array.filter() validation filtering utility", "The array.reduce() collection condensation function"], 0),
      q("What triad of states tracks the full operational resolution path of a native JavaScript Promise?", ["Pending, Fulfilled, or Rejected resolution states", "Active or Inactive functional status logs", "True or False evaluation logical checks", "Constructed or Deleted allocation variables structures"], 0),
      q("What browser execution phase lifts function declarations up to the top of active scopes before processing?", ["The Hoisting scope allocation phase", "The runtime code parsing compilation check", "The standard variable execution stage loop", "The garbage collection memory recycling sweep"], 0),
      q("Which comparison operator checks for strict equality matching both values and underlying data types explicitly?", ["The strict equality === operator", "The abstract equality == operator link", "The single variable assignment = parameter", "The inequality match type != tracking check"], 0),
      q("What browser mechanism propagates fired events up from target elements through ancestor trees?", ["The Event Bubbling propagation mechanism", "The Event Capturing phase interception track", "The Lexical scope lookup traversal route", "The Closure scoping variable trapping sequence"], 0),
      q("Which native utility stringifies active JavaScript objects down to valid web JSON text lines?", ["The JSON.stringify() encoding method", "The JSON.parse() file reconstruction parser", "The Object.keys() structural index extraction method", "The Array.from() collection conversion framework"], 0),
      q("Which execution keyword points to different context objects depending on how a function is called?", ["The dynamic 'this' context keyword", "The parent tracking 'super' class operator", "The immutable constant 'const' identifier", "The block scoped mutable 'let' variable"], 0),
      q("Which higher-order array method processes collections through an accumulator variable to output a single value?", ["The array.reduce() aggregation method", "The array.filter() constraint selection tool", "The array.slice() index range selection tool", "The array.some() boolean verification check"], 0),
      q("Which built-in event command halts event bubbling up through parent element trees?", ["The event.stopPropagation() event method", "The event.preventDefault() form submission override", "The return false legacy execution short circuit", "The break statement control loop exit command"], 0),
      q("Which method binds a specific execution context permanently to an independent function variable?", ["The function.bind() context alignment method", "The function.call() direct argument execution step", "The function.apply() array data processing shortcut", "The Object.assign() target replication procedure"], 0),
      q("What specific error variant drops when block-scoped variables are queried within temporal dead zones prior to declaration?", ["A native ReferenceError syntax break", "A standard TypeError validation error flag", "An application SyntaxError compilation break", "A malformed URIError web link exception"], 0),
      q("Which array processing tool creates a trimmed down array filtering elements that pass true/false tests?", ["The array.filter() index array method", "The array.find() individual item extractor link", "The array.map() modification pipeline routine", "The array.every() collection check validation"], 0),
      q("What native utility executes structured time delays once defined milliseconds countdown milestones clear?", ["The setTimeout() timing utility method", "The setInterval() repeating background execution loop", "The requestAnimationFrame() rendering speed handler", "The Promise.resolve() instant resolution wrapper"], 0),
      q("Which logical operator returns its right-hand operand when its left-hand operand is null or undefined?", ["The nullish coalescing ?? operator", "The standard logical OR || operator bridge", "The logical AND && short circuit check", "The conditional ternary ? selection layout"], 0)
    ] 
  },
  { 
    title: "CSS UI", 
    category: "development", 
    description: "Modern CSS box modeling, flexbox configurations, grid positioning, and responsiveness.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What strategy describes the utility inline styling approach named Tailwind?", ["A wind vector measurement calculation mapping script", "A utility-first CSS framework for rapid UI styling", "A script library building backend databases", "A desktop system web browser plugin extension"], 1),
      q("What layout capability defines the modern CSS flexbox mode?", ["A flexible graphics box design tool program", "A one-dimensional layout model for content alignment", "A custom mobile web layout framework application", "A technical system server optimization protocol group"], 1),
      q("What layer attribute does the stacking variable z-index orchestrate?", ["An alphabetical character positioning string tracker", "The stacking order configuration along the 3D Z-axis", "The computational calculation processing speed index", "The viewport grid width dimension limits dashboard"], 1),
      q("What web objective drives the implementation of CSS Media Queries?", ["Broadcasting digital media contents over web streams", "Applying conditional styling layouts based on device sizes", "Capturing inline browser camera video dimensions", "Saving text records to local disk directories"], 1),
      q("What spatial zone does internal layout padding control inside elements?", ["A bedroom decoration layout parameter setting", "The inner spacing buffer between content and borders", "The outer spacing buffer separating separate border boxes", "The total maximum width limits of canvas wrappers"], 1),
      q("Which layout technique handles structural complex two-dimensional content positioning across explicit columns and rows?", ["The CSS Grid layout configuration engine", "The Flexbox content alignment framework model", "The legacy float attribute positioning layout rules", "The standard inline block element box alignments"], 0),
      q("Which layout rule incorporates border and padding dimensions inside declared element width definitions?", ["The box-sizing: border-box specification", "The box-sizing: content-box layout default", "The display: flex container activation code", "The position: absolute element offset override"], 0),
      q("Which property manages horizontal content distributions inside a standard row-direction Flexbox container?", ["The justify-content positioning property", "The align-items vertical alignment indicator", "The flex-direction container axis setting", "The grid-gap track dimension separator variable"], 0),
      q("Which element positioning rule locks structures relative to the main browser window viewport regardless of scroll moves?", ["The position: fixed layout position rule", "The position: absolute offset alignment code", "The position: relative local coordinate baseline", "The position: static document default flow state"], 0),
      q("What property aligns flexbox children along the secondary cross-axis inside parent flex containers?", ["The align-items alignment property", "The justify-content distribution setting", "The flex-flow axis grouping parameter", "The margin-top outward padding modifier"], 0),
      q("Which flexbox parameter forces child elements down to secondary lines if container bounds run out of space?", ["The flex-wrap: wrap wrapping configuration", "The display: grid matrix activation code", "The overflow: hidden container content clipper", "The position: relative viewport mapping anchor"], 0),
      q("Which outward spacing parameter structures distance zones outside element borders separating adjacent elements?", ["The margin layout property variable", "The padding internal spacing setting", "The border-width outline frame size", "The outline-offset focus ring configuration"], 0),
      q("What display setting completely drops elements from rendering trees clearing their space footprint?", ["The display: none layout override parameter", "The visibility: hidden rendering transparency rule", "The opacity: 0 layer transparency variable", "The position: absolute floating document alignment"], 0),
      q("Which responsive sizing unit calculates lengths relative to the base HTML root font scale setting?", ["The rem relative unit size dimension", "The em local inheritance length unit", "The px absolute device pixel baseline", "The vh total viewport height multiplier"], 0),
      q("Which selector pseudoclass exclusively targets elements when mouse cursors pass over them?", ["The :hover interactive selector pseudoclass", "The ::after generation pseudo-element layout", "The generic .class configuration selector string", "The specific #id target element selection tag"], 0),
      q("What native syntax declares reusable global style parameters directly inside standard vanilla CSS stylesheets?", ["CSS Custom Properties / Variables (--var-name)", "SASS preprocessor nesting calculation loops", "JSON typography asset dictionary schemas", "Inline string template configuration tags"], 0),
      q("Which attribute formats the gap distance separations natively between columns and rows inside modern CSS grids?", ["The gap / grid-gap formatting property", "The margin-left external padding spacing track", "The padding-right inner buffer spacing field", "The border-spacing legacy data table parameter"], 0),
      q("Which CSS variable controls font line spacing parameters to ensure text general readability?", ["The line-height text formatting property", "The font-size dimension scaling indicator", "The letter-spacing character track setting", "The text-transform capitalize filter string"], 0),
      q("What attribute setting enables smooth duration transitions when element styles adjust over time updates?", ["The transition style configuration properties", "The transform skew animation calculation rules", "The animation-keyframes timing trajectory curves", "The will-change hardware rendering optimization flags"], 0),
      q("What position value places elements into document positioning streams relative to their standard baseline location?", ["The position: relative layout position rule", "The position: absolute coordinate mapping code", "The position: fixed viewport tracking baseline", "The position: static unadjusted default state"], 0)
    ] 
  },
  { 
    title: "Databases", 
    category: "development", 
    description: "Relational vs non-relational, data aggregation, normalization, and indices.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What architecture standard characterizes the MongoDB data storage system?", ["A relational SQL table engine platform", "A document-based non-relational NoSQL database", "A system security virus logging framework", "A local client browser application interface"], 1),
      q("What objective describes database queries across server systems?", ["Formulating a structured data retrieval search demand", "Locating hidden software codebase syntax bugs", "Writing clear script file directory structures", "Tracking active browser navigation visitor sessions"], 0),
      q("What role does a Primary Key fulfill inside relational database schemas?", ["Uniquely identifying every discrete row record inside tables", "Enforcing local network user logging passwords", "Creating secondary table replication backup copies", "Managing administrative routing controller profiles"], 1),
      q("What operations define the core database acronym CRUD?", ["Malicious structural tracking error events", "Create, Read, Update, and Delete standard database functions", "Fast network runtime compiling procedures", "Unit testing code verification checks definitions"], 1),
      q("What performance benefit does a database index provide?", ["Slowing data inputs to secure write chains", "Accelerating data retrieval search queries at cost of disk space", "Numbering output document pages for client printing", "Creating structural text file book reference logs"], 1),
      q("What structural methodology optimizes relational databases by removing field redundancies and data anomalies?", ["Database Normalization frameworks", "Horizontal data sharding split operations", "Key index generation procedures", "Denormalization field replication processes"], 0),
      q("Which relational column constraint anchors relationships by linking data records straight to alternative table keys?", ["The Foreign Key reference link", "The Primary Key identity index field", "The Unique constraint uniqueness tracking gate", "The Default parameter initial value assignment"], 0),
      q("What structural transaction standard guarantees database reliability through atomicity, consistency, isolation, and durability properties?", ["The ACID transactional properties framework", "The REST API endpoint connectivity principles", "The CRUD core functional definition pathways", "The NoSQL schema collection mapping layout"], 0),
      q("Which NoSQL processing pipeline filters, groups, and maps document array sets sequentially down data filter steps?", ["The Aggregation Pipeline data tracking framework", "The Mongoose schema schema definition structure", "The basic CRUD operation configuration tracking loop", "The standalone index creation mapping matrix"], 0),
      q("What scalability strategy horizontally partitions massive datasets across separate hardware database server architectures?", ["Database Sharding / Horizontal Partitioning", "Table database index configuration tasks", "Backup database replication synchronization schedules", "Field database normalization normalization procedures"], 0),
      q("Which Mongoose component models and validates document schemas before saving objects inside target MongoDB collections?", ["Mongoose Schema Models and validators", "Express backend application framework route middleware", "Dotenv environment injection file loader scripts", "JSON string utility text parsing modules"], 0),
      q("Which operational SQL query command completely drops a data table structure along with all its records?", ["The DROP TABLE data query command", "The DELETE FROM targeted row deletion command", "The REMOVE ROW record clearing instruction", "The TRUNCATE data table record emptying query"], 0),
      q("Which relational query option unites rows across separate tables leveraging overlapping column fields?", ["The JOIN operation query modifier", "The UNION calculation dataset merging query", "The GROUP BY aggregation grouping modifier", "The SELECT column choice data query rule"], 0),
      q("Which transaction statement completely rolls back active alterations if internal query breaks occur before processing commits?", ["The ROLLBACK database transaction command", "The COMMIT transaction saving verification block", "The SAVEPOINT intermediate recovery state tag", "The UPDATE query adjustment modification line"], 0),
      q("What database setup creates real-time matching duplicates of datasets across distinct backup server engines?", ["Database Replication / Replica Sets arrays", "Database Normalization array splitting tools", "Sharding division data split models", "Query search optimization indexing paths"], 0),
      q("What concurrency lock level locks individual table data fields to let alternate transactions modify alternative row entries safely?", ["Row-Level Locking data access controls", "Database freezing system backup freezing modes", "Schema dropping master system alterations", "Query aggregation memory pipeline hooks"], 0),
      q("What operational document unit represents the structural row equivalent inside NoSQL document database collections?", ["A JSON / BSON Document object", "A database Collection table mapping container", "An isolated Field data property attribute node", "A primary tracking Index data pointer item"], 0),
      q("Which relational isolation setup completely eliminates dirty reads by locking data fields until editing transactions finalize?", ["Read Committed Isolation level parameter setting", "Read Uncommitted open tracking permission", "Repeatable data constraint checking guidelines", "ACID database standard transaction benchmarks"], 0),
      q("Which relational utility statement formats summaries by condensing duplicate records based on categorical field values?", ["The GROUP BY data aggregation clause", "The ORDER BY sorting index direction instruction", "The WHERE data query filter condition checker", "The LIMIT calculation row count truncation rule"], 0),
      q("What document database data layout stores rich hierarchical object networks directly inside single records without joining separate tables?", ["Embedded / Nested Subdocuments data models", "Normalized relational table lookup architectures", "Primary indexing unique identification rows", "Horizontal database sharding chunk split lines"], 0)
    ] 
  },

  // ==========================================
  // 5. DATA SCIENCE (5 Quizzes, 20 Questions Each)
  // ==========================================
  { 
    title: "Python Data", 
    category: "data", 
    description: "Data manipulation, matrix math, dataframes, and computational pipelines.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What primary function does the Python package named Pandas manage?", ["An exotic wildlife preservation asset", "A data analysis library managing dataframes", "A video game loop physics engine tracker", "An operating system terminal kernel interface"], 1),
      q("What structural object models tabular records across columns and rows inside Pandas?", ["A responsive viewport window container", "A Pandas DataFrame structured data object", "A vector image placeholder layer frame", "A hardware hard drive file space sector"], 1),
      q("What computing capability describes the NumPy package package?", ["A simple digital currency token system", "A high-performance scientific matrix math library", "A local website browser automation backend", "An application code debugging log organizer"], 1),
      q("Which syntax prints log readouts safely inside standard Python files?", ["console.log('text') text trace line", "The built-in print() console function", "The echo command bash terminal query", "An outbound system log text file generator"], 1),
      q("What structural trait separates a Python Tuple from a standard List?", ["Tuples store double the memory volume fields", "Tuples represent immutable unchangeable sequences", "Tuples represent localized compilation syntax error bugs", "Tuples process string values exclusively across systems"], 1),
      q("Which Pandas command drops missing data rows containing null value fields out of DataFrames?", ["The dropna() data cleaning method", "The fillna() default parameter value injector", "The drop_duplicates() record unique filtering utility", "The clear() database storage resetting code"], 0),
      q("Which Pandas utility merges separate DataFrames together matching up relational data rows along structural axes?", ["The pd.merge() / pd.concat() operations", "The df.split() index array tracking line", "The df.join_string() text concatenation utility", "The pd.DataFrame() class model constructor link"], 0),
      q("Which function provides instant column statistical data overviews including mean, standard deviation, and min boundaries?", ["The df.describe() overview analysis method", "The df.head() starter row visualization line", "The df.info() column data type matrix trace", "The df.shape array dimensions readout tracking attribute"], 0),
      q("Which index selector extracts DataFrame rows using explicit integer absolute coordinate offsets?", ["The iloc[] positional coordinate selector", "The loc[] text label index identifier", "The at[] individual cell value extractor link", "The ix[] legacy selection lookup method parameters"], 0),
      q("Which data structure stores an unordered set of unique elements discarding duplicates automatically?", ["A native Set collection structure", "A standard List sequence array index", "An immutable Tuple collection block", "A multi-dimensional matrix array layout"], 0),
      q("Which methodology splits collections into statistical fragments to calculate custom aggregation metrics across categories?", ["The df.groupby() grouping analysis method", "The df.sort_values() sorting index direction modifier", "The df.pivot() database matrix layout transformation", "The df.apply() row mutation processing function"], 0),
      q("Which Python shorthand syntax populates transformed arrays within single code iteration lines?", ["List Comprehension looping syntax expressions", "Lambda function inline declaration blocks", "Generator statement memory streaming tools", "For routing loop multi-line conditional structures"], 0),
      q("Which prominent library structures machine learning algorithm models and data normalization pipelines inside Python?", ["The Scikit-Learn framework toolkit library", "The Pandas dataframe analysis tool extension", "The Matplotlib graphic data layout engine", "The network request handling utility package"], 0),
      q("Which logical command checks DataFrames to flag rows containing missing values or null data cells?", ["The df.isnull() / df.isna() validation checks", "The df.dropna() rows extraction cleaning utility", "The df.info() matrix summary structural tracking trace", "The df.count() active record total calculator line"], 0),
      q("Which syntax structures short, unnamed single-line inline function structures inside Python workflows?", ["Lambda functions inline expression blocks", "Def constructor multi-line tracking scripts", "Class definition object model structures", "Import code hook dependency declarations"], 0),
      q("Which attribute returns a tuple recording row-by-column count sizes over NumPy arrays or Pandas frames?", ["The df.shape matrix dimension attribute", "The df.size element volume calculator counter", "The df.columns text name array container", "The df.length individual item count tracking line"], 0),
      q("Which data cleaning option swaps DataFrame null cells with specified replacement values or column averages?", ["The df.fillna() missing value cell replacement method", "The df.dropna() target row extraction procedure", "The df.replace() absolute value replacement tool", "The df.interpolate() statistical sequence estimator"], 0),
      q("Which interactive development ecosystem allows engineers to mix live python blocks with text data files for analysis documentation?", ["Jupyter Notebooks browser interfaces", "VS Code command terminal software paths", "Python IDLE default application console systems", "Express local host backend server environments"], 0),
      q("What primary function does the standard dictionary structure handle within Python scripts?", ["Storing key-value data pairs mapping indices efficiently", "Normalizing relational database structures across systems", "Encrypting user identity validation password tracks", "Building front-end CSS rendering layout rules dynamically"], 0),
      q("Which package handles scraping structural elements off internet pages inside Python data pipelines?", ["BeautifulSoup / Scrapy web scrapers", "NumPy high performance scientific array matrices", "Matplotlib graphic chart layout pipelines", "Django backend enterprise software frame modules"], 0)
    ] 
  },
  { 
    title: "Stats", 
    category: "data", 
    description: "Statistical indicators, distribution shapes, probabilities, and hypothesis testing.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What measurement defines the mean indicator across statistical arrays?", ["An angry personality score trace parameter", "The computed numeric average value of an array", "The minimum scale threshold of datasets", "The maximum bounding limit value of sequences"], 1),
      q("What central indicator value marks the absolute exact midpoint layout of a sorted dataset?", ["The Median midpoint positioning indicator", "The Mean score average calculation metric", "The Mode highest frequency weight coordinate", "The Standard Deviation dispersion parameter"], 0),
      q("What is an outlier entry inside analytical data files?", ["A standard expected safe baseline data row", "An extreme data point deviating heavily from patterns", "A tiny fractional value close to absolute zero", "A system code translation syntax bug trace file"], 1),
      q("What definition maps the meaning of likelihood probabilities?", ["An absolute certain deterministic outcome guarantee", "The numeric likelihood indicator of events occurring", "The execution processing velocity tracker index", "The financial market pricing adjustment constant"], 1),
      q("What calculation objective tracks statistical correlations?", ["How variables relate or change in tandem directionally", "An accidental data processing error correction task", "The current monetary value scale of data files", "The aggregate sum total of data table rows"], 0),
      q("What measure tracks overall data dispersion variance around dataset mean baselines?", ["The Standard Deviation scale metric", "The raw range selection boundary layout", "The median split threshold categorization", "The interquartile range tracking scale width"], 0),
      q("What value range maps likelihood metrics securely across probability scopes?", ["0 to 1 continuous numeric bounding scale", "-1 to +1 coordinate trend parameter lines", "0 to 100 percentage layout tracking lines", "Negative infinity to positive infinity limits"], 0),
      q("What hypothesis baseline assumes no real structural change or effect exists between tested groups?", ["The Null Hypothesis (H0) parameter state", "The Alternative Hypothesis (H1) verification goal", "The P-Value significance checking threshold", "The Type I Error testing breakdown profile"], 0),
      q("What indicator tracks relational directions between -1 and +1 boundaries between two numeric properties?", ["The Correlation Coefficient (r) tracking metric", "The Standard Deviation dispersion boundary scale", "The Variance limit computation calculation check", "The Z-Score structural position parameter mapping"], 0),
      q("What testing error profile defines rejecting a true null hypothesis accidentally creating false alarms?", ["Type I Error (False Positive specification)", "Type II Error (False Negative categorization)", "P-Value significance miscalculation threshold step", "Standard variance drift modeling deviation trace"], 0),
      q("Which index registers exactly how many standard deviation units a data coordinate sits from baseline means?", ["The Z-Score coordinate scaling indicator", "The P-Value threshold evaluation parameter", "The F-Statistic analysis of variance calculator", "The T-Score individual subgroup metric tracker"], 0),
      q("What distribution format builds a perfectly symmetrical, bell-curve data visualization map?", ["The Normal / Gaussian Distribution pattern", "The skewed asymmetrical distribution profile track", "The bimodal dual peak distribution outline grid", "The uniform flat probability data distribution line"], 0),
      q("Which statistical indicator confirms result confidence levels against defined alpha thresholds to filter random anomalies?", ["The P-Value significance tracking index", "The mean average value calculation shortcut", "The Z-Score matrix position scaling parameter", "The total variance output coordinate summary"], 0),
      q("Which landmark theorem states that sample means mirror normal bell-curves as tracking sample volumes grow large?", ["The Central Limit Theorem (CLT)", "The Bayes' Theorem conditional probability layout", "The Law of Large Numbers scale convergence rule", "The Linear Regression slope calibration formula"], 0),
      q("What testing error profile describes accepting a false null hypothesis letting actual changes slip past undetected?", ["Type II Error (False Negative specification)", "Type I Error (False Positive categorization)", "The alpha error parameter trajectory variance trace", "The standard sampling variance computational gap tracking"], 0),
      q("Which hypothesis testing framework evaluates directional mean variances between two distinct target samples?", ["The T-Test framework analysis tracking script", "The Chi-Square category distribution test check", "The ANOVA multi-group variance evaluation matrix", "The linear tracking regression slope calculations"], 0),
      q("What tracking dimension maps dataset spread by calculating the difference between the 75th and 25th percentiles?", ["The IQR (Interquartile Range) spread width", "The standard variance parameter calculation index", "The absolute range spread limit definition track", "The mean absolute deviation scaling threshold model"], 0),
      q("Which mathematical theorem models conditional probability changes by incorporating updated factual evidence states?", ["Bayes' Theorem conditional probability formula", "The Central Limit theorem scale convergence theorem", "The Null Hypothesis validation tracking methodology", "The Z-Score normalization distribution boundary lines"], 0),
      q("Which analytical testing engine matches variance fields across three or more test categories simultaneously?", ["ANOVA (Analysis of Variance) multi-group models", "The T-Test logic individual subgroup tracking script", "The Chi-Square matrix distribution consistency check", "The linear regression slope trajectory line models"], 0),
      q("What type of variable covers categorical tracking fields lacking any native logical numeric order like color names?", ["Nominal data variables scale classification", "Ordinal ordered attribute parameter selections", "Continuous numeric tracking matrix column rows", "Discrete integer counter metric data points"], 0)
    ] 
  },
  { 
    title: "Visuals", 
    category: "data", 
    description: "Exploratory charts, relationship visualizations, and dashboard frameworks.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What primary function does the Python package named Matplotlib fulfill?", ["A foundational 2D plotting and chart visualization library", "An online arcade game application software extension", "A standalone operating system console terminal runtime", "An application code debugging workspace text editor"], 0),
      q("Which tracking use case fits best for a standard Bar Chart layout?", ["Creating drop down application navigation menus", "Comparing categorical data frequencies across discrete groups", "Rendering continuous circle tracking segment calculations", "Mapping high speed code processing optimization tracks"], 1),
      q("What operational domain uses the software system called Tableau?", ["Managing database relational row storage tables", "Enterprise Business Intelligence and interactive dashboards", "Automating mechanical automotive vehicle electrical components", "Building client side single page browser application loops"], 1),
      q("What capability defines an analytical Heatmap graphic?", ["Predicting local regional weather storm system tracks", "Mapping numerical density variations using color gradients", "Clearing configuration file caches inside backend servers", "Saving real-time camera image backups to storage folders"], 1),
      q("What tracking role defines a coordinate Scatter Plot layout?", ["Slicing glass materials using graphic vector shapes", "Mapping continuous coordinate dots to check multi-variable correlations", "Building ordered sequence lists within data files", "Normalizing database layout columns across system trees"], 1),
      q("Which visualization format explicitly captures dataset distributions using explicit five-number statistical box indicators?", ["The Box Plot / Whisker layout chart", "The pie chart slice percentage breakdown tool", "The line graph continuous trajectory tracking curve", "The scatter grid dot density alignment display"], 0),
      q("What chart configuration organizes continuous numeric inputs into grouped frequency bucket bars?", ["The Histogram frequency chart layout", "The standard categorical bar graph design module", "The scatter plot coordinate relationship map layout", "The multi-variable matrix heatmap color grid sheet"], 0),
      q("Which display choice traces continuous numeric attribute variations over chronological timeline parameters?", ["The Line Graph timeline projection system", "The pie chart part-to-whole slice layout framework", "The box summary statistical distribution chart card", "The heatmap matrix data coordinate gradient chart"], 0),
      q("Which high-level visualization package streamlines data aesthetic configurations natively on top of Python's Matplotlib?", ["The Seaborn graphic visualization library wrapper", "The Django web application template parsing engine", "The NumPy raw array scientific computing block grid", "The Express backend router endpoint data handling code"], 0),
      q("Which visualization formats part-to-whole segment percentage allocations across circular tracking assets?", ["The Pie Chart circular metric dashboard element", "The histogram data bucket column display module", "The scatter point multi-variable axis coordinate plot", "The line progression chronology tracking graph layout"], 0),
      q("What deceitful data visual error describes truncating axis charts away from zero baselines?", ["Truncated Axis Axis Scale Distortion manipulation", "Color gradient mapping saturation shift variations", "Data coordinate point label numbering placement tasks", "Normal distribution curve sizing configuration overlays"], 0),
      q("Which JavaScript web engine manages complex dynamic interactive data graphics inside modern browsers?", ["Plotly / D3.js web visualization engine libraries", "NumPy matrix computing data structure packages", "Dotenv script environment file loader packages", "Mongoose schema entity model builder components"], 0),
      q("What graph visualization maps multidimensional correlation matrices using matching row-by-column color variance boxes?", ["The Correlation Heatmap Matrix grid display", "The pie slice fractional component indicator chart", "The line tracking trend trajectory timeline path", "The box plot statistical summary distribution layout"], 0),
      q("Which chart style layers kernel density estimations straight over data box summaries to trace distribution shapes?", ["The Violin Plot visualization layout model", "The classic pie graph segment slice configuration", "The simple line path coordinate tracking vector", "The static plain text configuration data field box"], 0),
      q("Which graphic layout represents hierarchical nested datasets using proportional nested rectangular tile blocks?", ["The Treemap structural classification graphic design", "The line graph historical timeline parameter progression", "The scatter dot distribution data correlation axis layout", "The confusion matrix model classification success card"], 0),
      q("What core guiding mission dictates reliable data visualization engineering practices?", ["Exposing clean structural insights from complex datasets clearly", "Compressing source file storage weights down to minimum shapes", "Encrypting database data records securely away from user view", "Hard coding specific validation checkpoints across route boundaries"], 0),
      q("Which chart option tracks multi-variable property metrics spanning outwards from shared center origin points?", ["The Radar / Spider Chart design layout", "The simple vertical data bar chart module", "The stacked histogram block column distribution chart", "The linear trend trajectory line alignment graph"], 0),
      q("What display hazard arises when overloading data visualizations with excessive non-functional design decorations?", ["High Chart-Junk clutter suppressing insight extraction", "Automatic code minification file compile errors", "Database entry replication delay drops across cluster chains", "System security encryption key signature validation faults"], 0),
      q("What tracking tool visualizes workflow scheduling paths, tracking project milestone blocks over timelines?", ["The Gantt Chart project management schedule visualization", "The normal curve probability density graph mapping layout", "The scatter dot trend tracking axis mapping design card", "The tabular text log document sequence directory grid"], 0),
      q("Which color model standard ensures data graphics remain fully accessible to colorblind user demographics?", ["Colorblind-Friendly accessible palette selections (e.g., Viridis)", "High contrast glowing neon random layout assignments", "Monochromatic single shade saturation fading grids", "Default system monitor hexadecimal color parameters data"], 0)
    ] 
  },
  { 
    title: "Big Data", 
    category: "data", 
    description: "Distributed storage engines, stream computational frameworks, and transformation rules.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What core trait characterizes a Big Data analytical problem?", ["Extremely large, fast, or complex datasets defeating local RAM", "Writing basic string variables inside small script assets", "Enforcing standard user password verification clearances", "Building responsive user frontends inside local browsers"], 0),
      q("What software ecosystem is Apache Spark classified under?", ["A simple text editing terminal extension application", "A high-speed unified cluster-computing analytics processing engine", "A localized automotive vehicle component hardware control tool", "A web browser connection non-custodial extension wallet"], 1),
      q("What processing option tracks cloud infrastructure environments?", ["Checking storm vapor counts across weather patterns", "Relying on distributed remote data servers managed over internet paths", "Structuring local file systems manually on single office machines", "Writing plain text logs directly into static document strings"], 1),
      q("What process target defines deep data mining frameworks?", ["Extracting raw gold ores out of mining facilities", "Uncovering hidden structural patterns across massive dataset pools", "Writing local code configurations inside single computer folders", "Building interactive browser video game loop engines"], 1),
      q("What operational task constitutes data cleaning steps?", ["Washing physical computer server racks using cleaning solutions", "Filtering null cells, fixing anomalies, and dropping duplicates", "Deleting whole source directories to reset app projects", "Printing out structural error logs to local office screens"], 1),
      q("Which distributed storage engine segments files into redundant data blocks across massive clusters of commodity servers?", ["HDFS (Hadoop Distributed File System)", "Local system hardware solid state disk drives", "Single instance relational SQL server tables", "V8 internal computing memory storage allocations"], 0),
      q("Which distributed methodology processes data tasks parallel across independent nodes before condensing them into single answers?", ["The MapReduce software processing paradigm", "The Linear Regression statistical model fitting process", "The responsive CSS flexbox layout alignment system", "The JWT cryptographic security access token authentication pipeline"], 0),
      q("What operational sequence pipelines transformations via Extract, Transform, and Load procedures?", ["The ETL Pipeline data processing lifecycle architecture", "The CRUD core operational data state transformation loop", "The REST API endpoint connectivity pattern documentation", "The MVC framework architecture component pattern layout"], 0),
      q("Which distributed messaging infrastructure streams high-throughput event logs across computing cluster nodes in real-time?", ["Apache Kafka real-time streaming infrastructure", "Standard single-instance SQL backend local databases", "Static JSON file directory storage structures", "Local proxy setup connection terminal tools"], 0),
      q("What benchmark pillars define the foundational engineering obstacles of Managing Big Data grids?", ["The 5 Vs (Volume, Velocity, Variety, Veracity, Value)", "CSS typography spacing parameters and responsive breaklines", "Structuring short syntax code variable names without typos", "Creating custom vector graphic icon assets for web applications"], 0),
      q("What memory abstraction paradigm structures resilient, distributed data array states inside early Apache Spark cluster models?", ["RDD (Resilient Distributed Dataset) memory objects", "NoSQL collection array storage models inside document databases", "Primary key indexing strategies across relational tables", "JSON dictionary block structures inside text files storage"], 0),
      q("Which distributed non-relational storage system optimizes write-heavy queries across vast column families horizontally?", ["Apache Cassandra / HBase column-family databases", "Local SQLite single file database storage software", "Browser cache temporary memory storage limits", "Mongoose validation mapping schema models definition"], 0),
      q("What cloud repository design stores massive raw data dumps in their natural unvetted format before processing?", ["A Data Lake repository model", "A Data Warehouse analytical system", "A relational SQL transaction database node", "A static multi-dimensional folder directory path array"], 0),
      q("What centralized computing warehouse holds carefully structured data optimized explicitly for enterprise business analytics?", ["A Data Warehouse infrastructure system", "A raw data lake unvetted storage container", "A local browser memory caching space sector", "An unorganized collection pool of text document strings"], 0),
      q("Which automation orchestrator sequences, schedules, and monitors task dependencies across complex big data computational pipelines?", ["Apache Airflow workflow orchestration engine", "The V8 event loop optimization layer component", "The Express server routing controller code framework", "The Dotenv runtime script environment variable injector"], 0),
      q("Which massive cloud database analytical grid processes lightning-fast SQL queries across petabytes of data columns without server management?", ["Google BigQuery / Snowflake cloud analytics systems", "A local instance SQLite single file database block", "The Mongoose validator schema array model definition", "A basic JSON configuration file array reference template"], 0),
      q("Which computing framework operates abstraction layers allowing engineers to run standard relational SQL queries over data held inside HDFS storage clusters?", ["Apache Hive / Presto query execution engines", "MongoDB aggregate processing data filter hooks", "Local relative file directory path character strings", "Express controller backend application data models"], 0),
      q("Which open-source file format implements highly compressed, column-oriented storage architectures tailored for fast big data analytics loops?", ["Apache Parquet column-oriented file storage formats", "Raw uncompressed comma separated values text sheets (.csv)", "Standard JSON data string array serialization layouts", "HTML structural text document web browser wrappers"], 0),
      q("What process eliminates duplicated records across vast cluster systems to optimize disk footprints?", ["Data Deduplication data pruning procedures", "Sharding dataset chunk split distribution logics", "Token extraction character sequence text parsers", "Data vector framing matrix dimension adjustments"], 0),
      q("Which data design trend separates computing execution nodes from permanent storage infrastructure layers to cut big data operations costs?", ["Decoupled Compute and Storage architecture designs", "Symmetric hard drive processor server array assemblies", "In-memory database caching replication schedules", "Monolithic single server enterprise database frameworks"], 0)
    ] 
  },
  { 
    title: "SQL Analysis", 
    category: "data", 
    description: "Advanced relational operators, window functions, and analytics queries.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What operation defines the relational SQL SELECT instruction?", ["Choosing and filtering column fields to retrieve database rows", "Deleting target records permanently from data tables", "Creating a new database storage architecture schema instance", "Modifying existing user access permission variables"], 0),
      q("What data task maps to the relational WHERE clause?", ["Locating tracking file addresses across hard storage drives", "Filtering individual row records based on defined logic constraints", "Configuring target execution timing intervals for scripts", "Sorting output records into alphabetical character indexes"], 1),
      q("What relational achievement does an INNER JOIN execute?", ["Merging overlapping records from separate tables matching shared keys", "Splitting single data sheets into separate isolated text files", "Closing database server connections safely to prevent leaks", "Creating secure administrative backup copies of database logs"], 0),
      q("What operation handles the SQL aggregation command GROUP BY?", ["Starting real-time collaborative chat rooms over networks", "Condensing matching records into aggregate statistical rows", "Deleting duplicate table column categories entirely from files", "Sorting output strings by text length parameters index"], 1),
      q("What calculation returns from the core function COUNT()?", ["The total sum of numeric value fields inside data matrices", "The aggregate volume number of row rows matching query filters", "The total count of alphabetical text items within data fields", "The execution runtime duration track of query operations"], 1),
      q("Which relational clause applies logical filtering constraints over aggregated rows outputted from GROUP BY operations?", ["The HAVING clause filtering statement", "The WHERE data query row filter statement", "The ORDER BY sorting direction parameter index", "The SELECT column choice expression identifier"], 0),
      q("Which class of functions calculates row relative metrics like running totals without collapsing separate data rows?", ["Window Functions (e.g., SUM() OVER ())", "GROUP BY structural condensation operations", "COUNT structural row counting metrics functions", "JOIN relational data table linking parameters"], 0),
      q("Which relational set operator aggregates query records returning exclusively rows present in both separate datasets?", ["The INTERSECT set operator statement", "The UNION duplicate removing query aggregation", "The EXCEPT tracking filter data removal operator", "The OUTER JOIN relational dataset joining rule"], 0),
      q("What database statement registers clean inline temporary subquery views using a WITH clause to optimize complex analytics?", ["CTE (Common Table Expression - WITH syntax)", "The WHERE search query filter parameter condition", "The HAVING data aggregation verification filter rule", "The Primary Key distinct record uniqueness indicator"], 0),
      q("Which type of database JOIN returns every record from left inputs alongside overlapping data fields from right inputs?", ["The LEFT OUTER JOIN operation modifier", "The INNER JOIN strict key matching query format", "The RIGHT JOIN alternative table matching configuration", "The FULL OUTER JOIN holistic relational dataset fusion"], 0),
      q("Which evaluation function loops through sequential fields returning the very first non-null data value it identifies?", ["The COALESCE() data check function", "The COUNT() row counting aggregation utility", "The AVG() field numeric average calculation step", "The SUM() field numeric aggregate summation calculator"], 0),
      q("Which conditional clause structures multi-branch if-then logic flows directly inside SQL data fields?", ["The CASE WHEN conditional statement structure", "The WHERE lookup query parameter field rule", "The HAVING group aggregation filter verification track", "The nesting IF statement computational execution path"], 0),
      q("Which analytics window function computes positional ranks across records skipping rank values if numerical ties occur?", ["The RANK() analytics window ranking function", "The DENSE_RANK() window function preserving continuous ranks", "The ROW_NUMBER() sequential indexing positional utility", "The SUM() iterative aggregation mathematical loop tracker"], 0),
      q("Which query operation merges records from separate relational queries while discarding all duplicate data entries?", ["The UNION set operator statement", "The UNION ALL comprehensive record stacking command", "The INTERSECT shared data row filter statement", "The JOIN relational data table bridging command"], 0),
      q("Which subquery modifier evaluates target tables to confirm whether any valid matching records exist returning true or false?", ["The EXISTS boolean subquery evaluation operator", "The LIKE structural text string wildcard search condition", "The IN collection array checking validation parameter", "The BETWEEN range limit numeric boundary constraint"], 0),
      q("Which structural balanced-tree database index traverses node branches to accelerate range queries and lookups?", ["The B-Tree Database Index structure", "The Hash Index unique string hash ring map", "The Full-Text index keyword document mapping file", "The Primary row direct pointer data reference link"], 0),
      q("Which wildcard pattern matching operator searches strings for character sequences of any undetermined length inside LIKE conditions?", ["The percentage % wildcard character symbol", "The individual underscore _ single character placeholder", "The asterisk * generic character matching wild card", "The question mark ? search string input modifier"], 0),
      q("Which transaction isolation configuration exposes operations to 'dirty reads' by letting transactions view uncommitted changes?", ["The Read Uncommitted transaction isolation level setting", "The Serializable strict locking isolation parameter rule", "The Repeatable Read data value lock constraint guideline", "The ACID standard relational transaction performance benchmark"], 0),
      q("Which advanced analytics window function retrieves data cell attributes from proceeding database rows without leveraging self-joins?", ["The LAG() analytics window function lookup", "The LEAD() look-forward window function step", "The FIRST_VALUE() partition boundary extraction tool", "The NTILE() distribution segment bucket calculator"], 0),
      q("Which command locks query tracking scopes from processing duplicate row items across SELECT field requests?", ["The SELECT DISTINCT query filtering command", "The GROUP BY aggregation grouping modifier clause", "The WHERE uniqueness validation logic constraint check", "The LIMIT query outcome truncation parameter modifier"], 0)
    ] 
  },

  // ==========================================
  // 6. MARKETING (5 Quizzes, 20 Questions Each)
  // ==========================================
  { 
    title: "Digital Ads 101", 
    category: "marketing", 
    description: "Pay-per-click optimization, conversion metrics, tracking, and campaign scaling.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What is the business definition of marketing ROI?", ["Return on Intel processing benchmarks", "Return on Investment efficiency metrics", "The baseline Rate of Interest applied by banks", "A Real Object Identification tracking parameter"], 1),
      q("What metric tracks the advertising cost variable named CPC?", ["Cost Per Click paid on ad actions", "Core Price Center corporate finance indexes", "Click Per Code software execution benchmarks", "Cost Per Case distribution log parameters"], 0),
      q("What setup steps constitute an advertising A/B Test?", ["Comparing two creative versions to track performance differences", "Locating source code syntax errors inside interfaces", "Deleting old ad campaigns from history files entirely", "Scaling horizontal web server instances to process lookups"], 0),
      q("What role tracks conversion sources via JavaScript snippets named Pixels?", ["A screen pixel resolution metric setting", "A web tracking snippet logging user actions across sites", "A digital background graphic image file template", "A malicious software script virus payload track"], 1),
      q("What optimization domain covers the industry abbreviation SEO?", ["Search Engine Optimization organic visibility tuning", "Social Edge Optimization platform layout design", "System End Operations pipeline performance tracing", "Safe Exit Only building exit code configurations"], 0),
      q("What conversion metric calculates the percentage of ad traffic visitors performing a target commercial action?", ["The Conversion Rate metric check", "The Click-Through Rate interest metric line", "The Bounce Rate immediate exit tracking index", "The Impression Count raw volume display tracker"], 0),
      q("Which advertising metric tracks generated revenue ratios relative to every single dollar of ad resources spent?", ["ROAS (Return on Ad Spend) efficiency indicators", "CPC action billing market price parameters", "CTR layout interest ratio calculations index", "CPM cost index calculations across view volumes"], 0),
      q("What billing framework tracks campaign costs per every one thousand programmatic ad views delivered?", ["CPM (Cost Per Mille) view volume billing standard", "CPC action driven network billing pricing models", "CPA targeted customer acquisition cost indicators", "CTR design interface interaction tracking metrics"], 0),
      q("Which tracking string extensions attach to landing page URLs to map traffic channels inside analytics data pools?", ["UTM Tracking Parameters string appendages", "SQL primary indexing database foreign keys", "Mongoose validation data model array schemas", "Express application cookie state session tracking nodes"], 0),
      q("Which assessment score ranks keyword relevance and landing page speeds to judge ad bidding placement positions?", ["The Quality Score relevance ranking benchmark", "The experience levels (XP) leveling progression system", "The database search query index generation level", "The web page document loading speed timing duration"], 0),
      q("What ad campaign configuration targets marketing ads directly to consumers who previously engaged with site properties?", ["Retargeting / Remarketing audience tracking campaigns", "Cold prospecting unfamiliar audience demographic lists", "Organic SEO keyword research discovery optimization steps", "Email spam filtering domain checking processes"], 0),
      q("Which industry data platform tracks traffic acquisitions, demographics, and user behavior flows across corporate domains natively?", ["Google Analytics (GA4) traffic data software suite", "Node express backend application endpoint routers", "MongoDB document storage database cluster environments", "Wireshark data packet interception terminal networks"], 0),
      q("What term tracks the cumulative raw frequency volume of times a display ad layout prints onto user screen viewports?", ["Ad Impressions view count markers", "Ad Clicks user interaction events", "Ad Conversions successful target action steps", "Ad Leads successful communication registration signs"], 0),
      q("What strategic conversion map traces consumers down from raw brand awareness steps down to actual checkout transactions?", ["The Marketing Funnel optimization conversion architecture", "The ACID relational database transactional processing parameters", "The NoSQL data collection sequential validation path loops", "The Express backend application structural route schema layout"], 0),
      q("Which bid configuration sets absolute maximum price thresholds permitted for single ad link interactions?", ["Max Bid Cap parameter ceilings", "DeFi total value locked liquidity safety margins", "EVM transaction gas limit fee thresholds", "Campaign budget tier calculation structures"], 0),
      q("What landing page architecture trait decreases traffic bounce rates and retains visitor engagement loops efficiently?", ["Clear corporate value statements paired with clear CTA items", "Heavily nested uncompressed background promotional videos", "Completely hidden complex multi-stage lead contact forms", "Excessive external hyperlink options directing traffic away"], 0),
      q("Which advertising marketplace serves sponsored search engine listings across networks?", ["The Google Ads search marketing bidding platform", "The Google Search Console domain index checking hub", "The Google Analytics traffic trace metrics dashboard", "The Firebase cloud database backend hosting application suite"], 0),
      q("Which optimization tier edits local source markup tags, structures text headings, and writes clear metadata descriptions?", ["On-Page SEO content structural tuning steps", "Off-Page external authority link building campaigns", "Technical SEO website sitemap file structure optimizations", "Paid PPC search keyword contextual ad bidding networks"], 0),
      q("Which step validates promotional media items against platform regulatory rules prior to allowing campaigns to launch?", ["The Ad Review and Compliance Approval processing cycle", "Automated fuzz testing boundary condition checking scripts", "Production software deployment compilation syntax tests", "Database records mirror replication backup sync routines"], 0),
      q("Which structural campaign subfolder manages targeted ad assets grouped by contextual keyword criteria or custom demographic parameters?", ["An Ad Group / Ad Set configuration subfolder layer", "A master Campaign overarching structural folder container", "A user interaction history logbook ledger document file", "A global platform configuration reference property template"], 0)
    ] 
  },
  { 
    title: "Social Strategy", 
    category: "marketing", 
    description: "Organic channel growth models, audience profiling, and content distribution workflows.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What interactions establish organic social media platform Engagement?", ["Likes, comment strings, shares, and save event metrics", "Buying fake profile followers from automated server networks", "Optimizing front-end website document script loading speeds", "Purging database storage historical row entries manually"], 0),
      q("Which social network operates primarily as a professional business-to-business (B2B) networking ecosystem?", ["The TikTok short-form vertical video community platform", "The LinkedIn professional corporate networking ecosystem", "The Instagram photo sharing and visual discovery network", "The Snapchat disappearing visual messaging application"], 1),
      q("What core marketing command acronym directs users to perform explicit actions like 'Sign Up Now'?", ["CTA (Call to Action) design instruction elements", "Core technology enterprise platform application maps", "Click to add product shortcut shopping tools", "Code utility control administration interface filters"], 0),
      q("What parameter calculates the cumulative total of unique user screens displaying organic updates?", ["Organic Content Reach scope metrics", "Click total calculation interest counts", "Sales conversion revenue calculation figures", "Execution processing speed velocity markers"], 0),
      q("What characteristic marks viral social media growth patterns?", ["An internal database system software script error bug", "Spreading rapidly across network channels via exponential sharing", "A structural operating system core tracking malfunction", "A campaign funded exclusively by paid display advertising budgets"], 1),
      q("What corporate document profiles ideal customer habits, age metrics, income ranges, and product motivations to guide content creation?", ["A Target Buyer Persona blueprint profile documentation", "A relational SQL database user registry table schema layout", "A dynamic Mongoose schema configuration array indexing reference", "An Express backend application framework request token logging grid"], 0),
      q("Which performance variable do media delivery algorithms check to reward video content with extended user feed placements?", ["Audience Retention metrics / Average Watch Time durations", "The profile's total cumulative follower tracking counters", "The historical calendar account creation initialization date", "The browser cookies configuration security preference switches"], 0),
      q("What metric divides the total aggregate count of post interactions by cumulative display impressions to gauge asset resonance?", ["The Engagement Rate calculation percentage formula", "The bounce analysis tracking index mapping percentage", "The total raw scope tracking numbers of reach targets", "The page layout view printing counter variables logs"], 0),
      q("Which platform leads global short-form vertical loop video consumption channels for modern millennial and Gen Z demographics?", ["The TikTok mobile application distribution ecosystem", "The LinkedIn corporate professional network system", "The Pinterest visual board design inspiration matrix", "The Twitter / X real-time short text publishing channel"], 0),
      q("What asset maps publication timetables, platform destinations, writing copy, and asset links for upcoming channel schedules?", ["A Social Media Content Calendar organization grid", "A backend database table primary layout index document", "An Express backend application router script controller", "A Mongoose data collection validation parameter schema list"], 0),
      q("What channel strategy focuses on renting the trust networks of authoritative niche content creators to promote brands?", ["Influencer / Creator Marketing channel partnerships", "Cold email lead pipeline blast outreach operations", "Technical search engine optimization crawling index configurations", "Pay-per-click context display advertising network bidding"], 0),
      q("Which profile character functions as a tag index linking social posts globally beneath categorical keyword streams?", ["The Hashtag (#) character symbol prefix", "The At (@) profile username assignment symbol identifier", "The forward slash (/) relative application route divider", "The question mark (?) backend search query string parameter token"], 0),
      q("Which action metric signals high programmatic utility by indicating users stored social updates for subsequent manual reviews?", ["Post Saves / Bookmark tracking interaction events", "Raw profile impression view frequency metrics", "Account unfollow event tracking updates data logs", "Outbound link tracking parameter referral tokens lists"], 0),
      q("What framework leverages assets designed and published natively by real community members rather than corporate creative agencies?", ["UGC (User Generated Content) organic content frameworks", "Paid creative marketing agency custom video studio shoots", "Internal corporate static stock library graphic assets systems", "Automated generative AI asset model layout rendering loops"], 0),
      q("Which messaging blueprint hooks short-form narrative attention early before unpacking concepts and pitching closing targets?", ["The Hook-Body-CTA structural communication blueprint", "The ACID transactional tracking properties paradigm system", "The NoSQL database data model step configuration patterns", "The Express backend framework routing state middleware chain"], 0),
      q("Which visual platform structures organic product referral flows using user-curated image mood boards?", ["The Pinterest graphic inspiration curation platform", "The LinkedIn corporate resume networking marketplace", "The Twitch live stream interactive broadcast grid ecosystem", "The Reddit community nested sub-thread open forum boards"], 0),
      q("Which forum platform routes community visibility mechanics based on upvote/downvote scores within nested user sub-communities?", ["The Reddit discussion matrix and sub-forum grid ecosystem", "The Instagram mobile visual layout timeline interface", "The TikTok mobile vertical video distribution feed layer", "The Snapchat private visual messaging camera application"], 0),
      q("What analytical metric calculates the total count of hyperlink interactions leading straight to external profile website biographies?", ["Profile Link Clicks traffic generation tracking indicators", "Cumulative multi-media view impressions tracking frequencies", "Relational database record line update counter operations", "Backend server connection response latency execution thresholds"], 0),
      q("What process actively scans social channels for keyword mentions to monitor public brand sentiment trends?", ["Social Listening / Brand Sentiment Tracking procedures", "Automated email address spam sorting configurations", "Static front-end landing page form verification checking steps", "Database file optimization code script clearing routines"], 0),
      q("What content category focuses entirely on long-term authority building and industry education over aggressive immediate sales conversions?", ["Thought Leadership content creation tracks", "Direct sales conversion script copywriting models", "Database table normalization field adjustments tasks", "Backend API endpoint response speed profiling operations"], 0)
    ] 
  },
  { 
    title: "Email Marketing", 
    category: "marketing", 
    description: "Automation logic, funnel design, subscriber retention, and formatting.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What conversion metric tracks the email campaign indicator called CTR?", ["Click-Through Rate tracking link interactions inside layouts", "Core Task Runtime server efficiency benchmarks", "Call Time Ratio customer management metrics data", "Click Tool Representation interface indexing metrics paths"], 0),
      q("What communication block is indicated when an email pipeline flags a Bounce event?", ["Achieving historic record high conversion transaction volumes", "The receiving mail server rejecting the email delivery request", "A subscriber executing hyper-fast email link interactions", "A brand new subscriber registering via opt-in input forms"], 1),
      q("What definition maps to the email ecosystem term Spam?", ["Canned meat processing factory food items components", "Unsolicited or deceptive bulk promotional messaging arrays", "A functional code variable sequence running inside programs", "A computer system exploit payload string file virus"], 1),
      q("What role does a Lead fulfill across digital marketing pipelines?", ["A heavy physical structural alignment wire element line", "A prospective subscriber expressing interest in offerings", "The managing executive director overseeing company teams", "A customized system testing script file execution pathway"], 1),
      q("What mechanics handle modern email Marketing Automation workflows?", ["Deploying automated robotic arms to inspect data keyboards", "Triggering specific email sends based on user action metrics", "Deleting subscriber listings to clear local history file folders", "Executing manual copywriting entry steps for every single email"], 1),
      q("Which confirmation standard mandates subscribers validate their email addresses by clicking verification links before joining lists?", ["The Double Opt-In verification registration workflow", "An automated profile unsubscribe clearing transaction flow", "A local browser tracking cookie clearing procedure task", "A relational database table record deletion script file"], 0),
      q("Which email metric calculates the percentage of successfully delivered campaigns opened by list subscribers?", ["The Open Rate conversion tracking percentage metrics", "The click-through rate link interaction index trackers", "The bounce event tracking calculation balance percentage", "The spam complaint reporting frequency count indicator"], 0),
      q("What messaging paradigm sequences emails automatically tracking explicit user action cues like downloading whitepapers?", ["Behavioral / Trigger-Based Email Lifecycle Automation", "Mass batch broadcast generic list blast campaigns", "Manual terminal data logging on spreadsheet text matrices", "Static layout design page rendering compilation loops"], 0),
      q("What database division method structures list contacts into subcategories using historical purchasing traits or activity histories?", ["Email List Segmentation categorization strategies", "Database normalization table schema design procedures", "Express server session token authentication checking filters", "Array processing slice index memory isolation steps"], 0),
      q("Which interface element must sit positioned inside promotional broadcast layouts by absolute global legal requirement?", ["An accessible one-click Unsubscribe link mechanism", "Direct hyperlinks forwarding to secondary social media channels", "A mosaic tile layout of product catalog design options", "A plain text corporate office physical location listing only"], 0),
      q("Which federal data statute enforces commercial email communication parameters and opt-out rights across the USA?", ["The CAN-SPAM Act legal framework data regulation", "The GDPR consumer data privacy regulation standard rules", "The OWASP secure web framework secure coding guidelines", "The ERC token protocol structure interface code constraints"], 0),
      q("What transmission failure occurs when emails are blocked permanently because recipient domains are invalid or deactivated?", ["A Hard Bounce critical delivery failure event", "A Soft Bounce temporary email storage box delivery block", "A spam complaint server routing reputation flag indicator", "An open rate tracking pixel synchronization latency delay"], 0),
      q("What category covers programmatic emails like purchase invoices, automated receipt logging, or password recovery steps?", ["Transactional Email programmatic messaging modules", "Promotional marketing sales broadcast blast updates", "Cold sales prospecting outreach presentation scripts sets", "Weekly newsletter summary aggregate digest publications"], 0),
      q("Which email layout component represents the initial string text driving subscriber open rate trends?", ["The Subject Line text formulation configuration", "The footer metadata description text block template", "The inline graphic asset alt text description placeholder", "The primary CTA hyperlink landing destination button layer"], 0),
      q("What structural methodology evaluates subject line configurations by testing alternate variants across separate test list segments?", ["Subject Line A/B Split Testing procedures", "Database table indexing and optimization data tasks", "Server process parameter injection script compilation checks", "Responsive CSS layout breakpoint width size updates"], 0),
      q("Which dedicated message flow greets newly validated opt-in profiles to establish early brand relationship anchors?", ["The Welcome Email Automation sequence flow", "An automated cart abandonment recovery reminders chain", "A list re-engagement campaign target outreach framework", "A system database stale profile deletion purging script"], 0),
      q("What delivery obstacle occurs when emails are held because recipient storage buckets are completely full?", ["A Soft Bounce temporary mail infrastructure hold", "A Hard Bounce critical permanent address validation failure", "A spam filter network perimeter configuration lockout", "A subscriber list unsubscribe loop tracking script block"], 0),
      q("Which structural component lets core marketing engines confirm that a subscriber opened HTML email layouts?", ["A transparent tracking pixel image asset script injection", "An Express framework application server request monitoring logger", "A dynamic Mongoose data collection validator model link", "A local client browser cookie filter validation switch"], 0),
      q("What email automation flow launches targeted recovery incentives when consumers drop checkout processes mid-way?", ["Abandoned Cart Recovery Automation sequence pipelines", "Fresh subscriber welcome automation greeting loops", "Periodic newsletter summary digest compilation tracks", "Initial system user registration sequence onboarding paths"], 0),
      q("Which rating index reflects sender trustworthiness across global ISP sorting firewalls to judge inbox delivery routing?", ["The Sender Reputation Score / Sender Score metrics", "The raw data entry validation precision indexing metric", "The F1 accuracy metric balance optimization factor score", "The database collection primary tracking index key weight"], 0)
    ] 
  },
  { 
    title: "Brand Identity", 
    category: "marketing", 
    description: "Visual design language, tone of voice blueprints, guidelines, and market positioning.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What visual asset represents a company's primary corporate logo?", ["A variable text file name reference indicator line", "A distinct visual signature emblem anchoring brand recognition", "A hosted application web framework portal platform", "A structural typography styling font selection package"], 1),
      q("What elements characterize the concept of Brand Voice?", ["A multi-media voice recording file component stream", "The consistent personality and style of corporate communications", "An audio tracking theme song baseline melody layout", "A promotional video advertisement clip compilation set"], 1),
      q("What market space defines a business commercial Niche?", ["A specialized target market segment with specific demands", "A massive multi-department global brick-and-mortar retail facility", "An unexpected software source code syntax runtime loop error", "The baseline financial cost pricing adjustment of service lines"], 0),
      q("What marketing component structures a brand Tagline?", ["A functional script code line processing computations", "A memorable phrase encapsulating corporate mission statements", "An outbound hyperlink address targeting external web domains", "A system properties configuration parameter text file block"], 1),
      q("What focus explores the structural rules of design Color Theory?", ["Learning how to manually mix paint colors across oil canvases", "Understanding the psychological effects colors exert over consumers", "Writing hexadecimal color string value codes inside style sheets", "Adjusting screen backlight illumination output configurations"], 1),
      q("Which master corporate blueprint defines color keys, typographic families, and design configurations to ensure visual unity across assets?", ["The Brand Style Guide / Brand Book documentation", "A database structure schema layout migration script block", "An Express framework backend routing application controller file", "A NoSQL database data model entity relationship matrix schema"], 0),
      q("What positioning statement explicitly states the distinct benefits a product fulfills better than marketplace rivals?", ["The Core Value Proposition statement framework", "A responsive CSS viewport layout scaling rule grid", "A Mongoose data collection routing property setup script", "A system security access permission password encryption block"], 0),
      q("Which marketing model charts brand persona variations into behavioral models like the Creator, Explorer, or Caregiver?", ["The Brand Archetypes strategic psychology frameworks", "Target audience demographic profiling breakdown schemas", "Relational database index parameter configuration files", "API parameter dataset variable definition directories"], 0),
      q("What design execution choice guarantees cross-channel corporate visual recognition across print packaging arrays?", ["Maintaining uniform color codes, logos, and typographic guidelines", "Changing structural font selections across every product print batch", "Omitting brand tracking identifiers to minimize graphic layout spaces", "Varying tone of voice patterns every calendar month randomly"], 0),
      q("Which assessment track checks public image evolutions following corporate brand modification overhauls?", ["Brand Perception Auditing and market tracking procedures", "Static source code checking and runtime error script debugging", "Database table indexing structural maintenance processing checks", "Cloud application server active memory space allocation tests"], 0),
      q("What concise vision declaration frames a company's absolute systemic values and long-term future targets?", ["The Corporate Mission and Vision Statement documentation", "A dynamic website product tag tracking character string text", "A set of nested CSS custom class styling property rules", "An Express framework router controller endpoint assignment layout"], 0),
      q("What intangible brand equity value models customer affinity, reputation weights, and direct trademark value over commodity product costs?", ["Brand Equity financial and reputational valuation metrics", "The material inventory turnover computation tracking counters", "Database storage capacity allocation hardware tracking logs", "Application cloud server transaction loop processing bandwidth"], 0),
      q("Which strategic matrix maps out direct competitor footprints along shared axis parameters like price thresholds vs quality scales?", ["A Competitive Positioning Matrix chart framework", "A NoSQL data collection search query index design lookup", "An Express backend framework application middleware tracking loop", "A JWT cryptographic security access token authentication chain"], 0),
      q("What user milestone describes satisfied consumers promoting brand entities to peer networks organically for free?", ["Brand Advocacy and viral word-of-mouth promotion behaviors", "Cold target prospect conversion pipeline trace indicators", "An automated email list outbound bounce loop filter check", "Paid contextual ad market click volume distribution parameters"], 0),
      q("Which font family layout uses visible small tail strokes at character endpoints to convey classic trust and elite authority?", ["Serif Typography font structural family configurations", "Sans-Serif minimalist linear typography layout styles", "Monospace code block display text styling font rules", "Handwritten cursive script calligraphy presentation vectors"], 0),
      q("Which clean modern typography layout eliminates endpoint stroke tails to fit sleek high-readability digital user interface designs?", ["Sans-Serif Typography minimalist font family designs", "Serif classic structural typography layout font blocks", "Script calligraphy flow presentation character font sets", "Monospace character code block variable layout tracks"], 0),
      q("Which design infrastructure outlines hierarchical organization models linking sub-product logos straight to parent corporate brands?", ["The Brand Architecture alignment strategic documentation", "Database normalization table split synchronization loops", "Express application framework router directory configuration paths", "Responsive CSS component grid canvas layout measurement metrics"], 0),
      q("What single parameter guides successful cross-platform identity management rules ensuring cohesive corporate assets deployment?", ["Brand Consistency parameters enforcement across all asset layouts", "Variable interface component size resizing updates dynamically", "Database schema record field layout table expansions scripts", "Dynamic automation script adjustments tracking environment contexts"], 0),
      q("What visual modeling chart traces the exact psychological attributes and emotional concept networks consumers associate with brand logos?", ["Brand Association Mapping analytics framework charts", "Multi-dimensional data array configuration array sizing blocks", "Database record field grouping classification parameters index", "Express web server static file compilation pipeline paths"], 0),
      q("What overarching milestone justifies investments into meticulous visual and contextual brand identity frameworks?", ["Forging distinct memorable market differentiation against market clutter", "Shrinking backend server hard storage file system footprints", "Minifying production client javascript file asset byte volumes", "Automating backend REST API request string payload parsing loops"], 0)
    ] 
  },
  { 
    title: "Content Mastery", 
    category: "marketing", 
    description: "Copywriting frameworks, search engine authority, and asset pipelines.",
    creator: SYSTEM_CREATOR_ID,
    questions: [
      q("What structural function defines an article Headline copy element?", ["The primary title designed to capture attention and drive clicks", "A protective hard clothing item worn on worker heads", "The secondary fine print metadata information text block lines", "An outbound destination tracking link targeting external networks"], 0),
      q("What functional definition characterizes the profession of Copywriting?", ["Navigating legal trademark registration paperwork procedures", "The art of writing strategic text copy designed to compel actions", "Operating high volume paper print shop hardware production units", "Formulating mathematical logic loops inside code script frameworks"], 1),
      q("What delivery template structures an organic digital Blog platform?", ["An online digital video stream distribution interface channel", "An informational publication site hosting long-form articles", "A real-time localized communication messaging software portal", "A web-based multiplayer puzzle game application canvas block"], 1),
      q("What format characterizes a digital marketing Infographic asset?", ["A plain text database log containing character string entries only", "A visual graphic layout distilling data metrics through diagrams", "An audio sound track tracking operational theme music logs", "A system configuration variables text block reference blueprint"], 1),
      q("What role does marketing Storytelling serve across digital campaigns?", ["Fabricating deceptive corporate earnings balance metrics data", "Formulating cohesive narratives to build emotional audience bonds", "Reading out current global news headlines off media updates", "Modifying software configuration dependencies inside systems folders"], 1),
      q("Which classic copywriting framework structures sales pages systematically via Attention, Interest, Desire, and Action components?", ["The AIDA Copywriting Framework structural architecture", "The ACID relational database transactional processing parameters", "The CRUD structural data model core functional pathway rules", "The MVC application component directory configuration layout maps"], 0),
      q("Which long-form editorial document establishes sector authority by presenting real-world diagnostic case research transformations?", ["A comprehensive corporate Case Study / Whitepaper documentation", "A short brief text social platform channel update announcement", "A string of nested CSS class styling selector variables text", "A JSON multi-variable backend properties reference properties file"], 0),
      q("Which performance rating indicates domain ranking trust thresholds based on the volume of inbound authority backlink references?", ["Domain Authority (DA) / Backlink Profile trust metrics", "The bounce analysis tracking index mapping statistics calculation", "The total raw image resolution asset pixel count parameters", "Relational database indexing key reference weight allocations"], 0),
      q("What layout strategy organizes digital publishing assets to systematically address organic search search intentions?", ["Content Marketing Strategy holistic publishing roadmaps", "Static plain text document text data configuration layouts", "Minifying javascript file asset weights across build processes", "Normalizing schema structure fields across relational database lines"], 0),
      q("Which data analysis step tracks monthly lookup loops and competition indexing scores before starting text drafts?", ["Keyword Research & Search Volume Analysis analytical procedures", "Fuzz testing boundary condition data checking security scripts", "Production cloud deployment compilation automation loops processing", "Express server session clearing parameter logic adjustments rules"], 0),
      q("What copywriting asset drives audience actions by defining explicit next steps at the base of marketing documents?", ["The CTA (Call to Action) targeted text instruction string", "The top page application header navigation option grouping rows", "An inline graphic asset source alt text description label box", "A bottom footer metadata platform copyright disclosure string text"], 0),
      q("Which copywriting framework organizes text content streams down Problem, Agitate, and Solve psychological checkpoints?", ["The PAS Copywriting Framework structural configuration", "The AIDA multi-stage conversion copywriting sequence blueprint", "The CRUD operational data lifecycle functional layout standard", "The REST API endpoint connectivity architecture schema charts"], 0),
      q("What metadata string informs search engines what concepts individual pages unpack inside search engine results snippets?", ["The Meta Description snippet source tag formatting", "A dynamic CSS internal variables styling mapping structure code", "A JSON configuration properties object dataset list container", "An Express backend app controller router destination logic block"], 0),
      q("What content layout integrates text data strings alongside graphical chart representations to optimize customer education velocities?", ["An Infographic design layout asset illustration", "A tabular text database file index list catalog spreadsheet", "An audio speech recording file track playback assembly script", "A relational database schema table association mapping architecture"], 0),
      q("What content metric tracks the aggregate temporal durations visitors look at digital publication properties?", ["The Time on Page engagement duration metric track", "The bounce rate immediate exit calculation statistical percentage", "The ad impression view frequency raw counting ledger indicators", "The backend server transaction sequence delay latency tracking logs"], 0),
      q("What distribution asset sequences regular value updates straight to subscriber email lists to scale audience retention?", ["An email Newsletter publication or corporate digest format", "A cold prospect outbound sales presentation script document set", "A dynamic Mongoose query data collection logic matching string", "A local proxy network gateway connectivity configuration blueprint"], 0),
      q("What strategy extracts distinct micro-assets from single master long-form documents to optimize production efficiency across multiple channels?", ["The Content Repurposing / Recycling distribution model", "A master system backup schedule file compression procedure", "A NoSQL database field minification data compression track", "An Express backend framework application routing parameters script"], 0),
      q("Which editorial component serves as the absolute primary text hook designed to maximize content title click metrics?", ["The structural Article Headline copy formatting", "A footnote disclaimer text sequence line at footers", "An image file source path text reference identification tag", "A nested CSS flexbox alignment styling width dimension assignment"], 0),
      q("What primary benchmark defines the modern operational mission of content marketing workflows?", ["Earning audience loyalty by providing systemic educational value", "Cutting REST API string data transmission byte size weights", "Encrypting database text rows safely to block unauthorized reviews", "Minifying all active software package compilation dependencies completely"], 0),
      q("Which tracking index records the percentage of first-time site visitors who depart domains after looking at only a single text sheet?", ["The Bounce Rate traffic exit metric tracking percentage", "The click-through rate link option interest measurement index", "The cumulative impression view total parameter listing tracker", "The data collection primary indexing database lookup velocity scale"], 0)
    ] 
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connecting to database and Seeding Strict 20-Question Modules...");
    
    // Clear the current collection
    await Quiz.deleteMany({});
    
    // Write clean data matching image schema parameters verbatim
    await Quiz.insertMany(quizData);
    
    console.log("✅ Success: 25 Quizzes with exactly 20 schema-compliant questions each injected into MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database Seeding Exception:", err);
    process.exit(1);
  }
};

seedDB();

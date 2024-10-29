# Wallet Integration

This document covers the details of creating and/or integrating a wallet in the Tari Network. In it, we will discuss:
* A brief explanation of Tari and how it operates
* An overview of the wallet library and accompanying Foreign Functions Interface (FFI)

## Minotari, Ootle and wallet considerations

Minotari is the base layer, and is fundamentally the engine of Tari. Through proof-of-work merge mining, Minotari ensures the validity and security of the network and transactions on it. Miners are rewarded for their efforts through the generation of Minotari (XTM) coins in addition to Monero through merge mining. Minotari utilises the MimbleWimble protocol for its transactional model, with extensions that allow for scripting, stealth addresses and other features not provided by default in the standard MimbleWimble protocol.

The base nodes are the primary 

This ties into the second layer, the Ootle, in several ways. The first is the Ootle layer's tokens, Tari (XTR), can only be created through the process of "burning" Minotari coins. This is the only method by which new Tari can be introduced into the second-layer. The Minotari layer also maintains a register of validator nodes that are used to verify transactions on the second layer, contract templates used to perform actions on the second layer (such as the creation of Digital Assets) and store smart contracts that allow for special transactional requirements and decentralised apps (dapps).

This has several implications for those designing wallets to operate on the Minotari layer:

* Wallets do not use addresses, instead relying on public and private keys and negotiated transactions between online participants.
* Minotari, through TariScript, allows for additional functionality such as once-off payments, covenants and stealth addresses that wallets need to be able to take into account.

## Tari wallet libraries

Tari provides a software library and foreign function interface for said library that allows developers to access the various functions that are available for Minotari wallets. Both are located in the Tari project in the `base_layer` folder under the `wallet` and `wallet_ffi` folders.

### wallet

The [wallet library](https://github.com/tari-project/tari/tree/development/base_layer/wallet) (largely defined in the `wallet` API) is a Rust library that provides developers several functions for interacting with the Tari blockchain via its modules:

* `base_node_service`: manages requests to and from the connected base node, collects information regarding the state of the connected base node, and ensures the wallet remains synchronized with the blockchain.
* `transaction_service`: handles the creation, signing and broadcasting of transactions while managing their state from inception to finalisation. It also has functions for monitoring the network and ensuring that transactions meet necessary requirements.
* `output_manager_service`: handles Unspent Transaction Outputs (UTXOs). This module tracks the wallet balance, ensures which UTXOs are available for spending vs locked transactions and selecting specific UTXOs for new transactions. It also handles the generation of keys for sending/receiving transactions.
* `connectivity_service`: handles the communication and connection with the base node and other wallets. Establishing connection with base nodes, maintain network connectivity and handling incoming network requests.
* `storage`: various functions for interacting with the storage of wallet data and interaction with said data
* `error`: has several error types and messages, and is responsible for both displaying these messages to a user while providing several methods for handling error states. 
* `util`: functions related to the management of the wallet identity and wallet connectivity between wallets during transactions.
* `utxo_scanner_service`: responsible for regularly checking the Minotari blockcgain for UTXOs that are associated with the wallet (such as those committed via the `transaction_service`)
* `schema`: defines the wallet's database structure and schema migrations.
* `config`: configuration management of the wallet, defining configuration variables such as the path to the database, location of configuration files, specific blockchain it is connecting to and more.

This should be your first port of call for developing a wallet on the Minotari layer. Use Cargo to build the library, which will generate a `libminotari_wallet.rlib` file. This will then need to be incorporated into your dependencies via your Cargo.toml file or similar.

```toml
[dependencies]
libminotari_wallet_library = { path = "../libminotari_wallet_library" }
```

For an example of a wallet using just the wallet library, you can review the [Minotari Console wallet code here](https://github.com/tari-project/tari/blob/development/applications/minotari_console_wallet/), which is designed to work with XTM.

### wallet_fii

This is the FFI for the wallet library, [located here](https://github.com/tari-project/tari/tree/development/base_layer/wallet_ffi). The FFI allows the Tari wallet library, which is written in Rust, to be used in other programming languages that support C bindings.

The main components of the FFI are:
* `lib`: the main library that includes the functions, structs, implementations, modules and exports available via the FFI. This is where the primary wallet operations, such as creating a wallet, monitoring UTXOs and thelike are held
* `errors`: handles communication of error messages around common error states
* `callback_handler`: monitors event streams from various wallet services and provide asynchronus feedback ot the client application
* `ffi_basenode_state`: provides several functions for getting state information regarding a connected base node
* `tasks`: handles the recovery of a wallet via the FFI

To build the FFI, use Cargo to build to the desired environment you will be developing for. For example, if you were going to be using this FFI to create an Android wallet, you would use

```
cargo build --release --target aarch64-linux-android
```

The FFI has inline documentation for the various functions that are available. While there are several ways you can generate and view this documentation, one of the easiest to use Cargo via `cargo doc --open --no-deps`, which will generate and open the documentation in your default browser.

The Aurora Wallet is an example of a wallet designed using the FFI. If you would like to review the implementation of this, you [can check out the Aurora project here](https://github.com/tari-project/wallet-android)


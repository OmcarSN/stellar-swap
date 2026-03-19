 
#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, Address, Env, Symbol,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    SwapCount,
}

use soroban_sdk::symbol_short;

#[contract]
pub struct StellarSwapContract;

#[contractimpl]
impl StellarSwapContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::SwapCount, &0u64);
    }

    pub fn swap(
        env: Env,
        address_a: Address,
        address_b: Address,
        token_a: Address,
        token_b: Address,
        amount_a: i128,
        min_b_for_a: i128,
        amount_b: i128,
        min_a_for_b: i128,
    ) {
        if amount_a <= 0 || amount_b <= 0 {
            panic!("Swap amounts must be positive");
        }
        if min_b_for_a <= 0 || min_a_for_b <= 0 {
            panic!("Minimum amounts must be positive");
        }
        if amount_b < min_b_for_a {
            panic!("Slippage exceeded: amount_b is less than min_b_for_a");
        }
        if amount_a < min_a_for_b {
            panic!("Slippage exceeded: amount_a is less than min_a_for_b");
        }

        address_a.require_auth();
        address_b.require_auth();

        let client_a = token::Client::new(&env, &token_a);
        client_a.transfer(&address_a, &address_b, &amount_a);

        let client_b = token::Client::new(&env, &token_b);
        client_b.transfer(&address_b, &address_a, &amount_b);

        let count: u64 = env
            .storage()
            .instance()
            .get(&DataKey::SwapCount)
            .unwrap_or(0);
        env.storage()
            .instance()
            .set(&DataKey::SwapCount, &(count + 1));

        env.events().publish(
            (SWAP_TOPIC, address_a.clone(), address_b.clone()),
            (token_a, token_b, amount_a, amount_b),
        );
    }

    pub fn admin(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
            .expect("Contract not initialized")
    }

    pub fn swap_count(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::SwapCount)
            .unwrap_or(0)
    }
}
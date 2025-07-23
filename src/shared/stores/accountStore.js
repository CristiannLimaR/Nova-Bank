import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAccountStore = create(
  persist(
    (set, get) => ({
      account: null,

      setAccount: (accountData) => {
        set({ account: accountData });
      },

      clearAccount: () => {
        set({ account: null });
      },

      getBalance: () => get().account?.balance ?? 0,
      getAccountNo: () => get().account?.accountNo,
      getVerify: () => get().account?.verify,
    }),
    {
      name: "bank-account",
      partialize: (state) => ({
        account: {
          _id: state.account?._id,
          accountNo: state.account?.accountNo,
          balance: state.account?.balance,
          verify: state.account?.verify,
        },
      }),
    }
  )
);

export default useAccountStore
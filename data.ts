// Object (Transaction Data)
interface Receipt {
        id: number,
        type: string
        name: string
        detail: string
        amount: number
    }

export let receipts: Receipt[] = [
        {id: 1, type: "cash in", name: "gaji" , detail: "gaji agustus" , amount: 500.000},
        {id: 2, type: "cash out", name: "utang", detail: "jono minjem cepe" , amount: 100.000},
        {id: 3, type: "cash in", name: "utang", detail: "jono bayar utang (nyicil)", amount: 20.000},
        {id: 4, type: "cash out", name: "slot", detail: "kalah main slot", amount: 400.000}
    ]
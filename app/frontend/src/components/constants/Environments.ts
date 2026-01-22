const environments: string[] = import.meta.env.VITE_PENSJON_ACCESS === "prod" ?
    [
        "PROD",
        "Q0"
    ] : [
        "Q1",
        "Q2",
        "Q5"
    ];

export default environments
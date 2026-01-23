const environments: string[] = import.meta.env.VITE_PENSJON_ACCESS === "prod" ?
    [
        "prod",
        "q0"
    ] : [
        "q1",
        "q2",
        "q5"
    ];

export default environments
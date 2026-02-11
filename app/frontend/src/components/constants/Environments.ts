console.log("VITE_PENSJON_ACCESS value:", import.meta.env.VITE_PENSJON_ACCESS);
console.log("VITE MODE:", import.meta.env.MODE);
console.log("VITE_PENSJON_ACCESS === 'prod':", import.meta.env.VITE_PENSJON_ACCESS === "prod");

const environments: string[] = import.meta.env.VITE_PENSJON_ACCESS === "prod" ?
    [
        "pensjon-regler"
    ] : [
        "pensjon-regler-q0",
        "pensjon-regler-q1",
        "pensjon-regler-q2",
        "pensjon-regler-q5"
    ];

export default environments
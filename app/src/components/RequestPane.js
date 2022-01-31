import { getDefaultNormalizer } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import '../App.css';

function RequestPane(props) {
    const [id] = useState(props.id)  //121042323
    const [result, setResult] = useState([]);

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('https://pensjon-preg-logviewer-api.dev-fss.nais.io/api/log/' + id
            ,{
            headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
           )
            .then(response => response.json())
            //.then(myjson=>console.log(myjson))
            // .then(data => setResult(JSON.stringify(data)));
            .then(data => setResult(data));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },[result.xml]);

    return (
        <div class="RequestPane">
            <h1>REQUEST</h1>
            <p>request id : {id}</p>
            <p>environment : {result.environment}</p>
            <p>content : {result.xml}</p>
        </div>

    );
}

// class RequestPane extends React.Component {

//     _isMounted = false;
//
//     constructor(props){
//         super(props)
//         this.state = {
//             id: this.props.id,
//             request: null,
//             isLoaded: false
//         }
//     }
//     //Uses ID from URL to make a call to logviewer API to get request/metadata. Not working yet
//     componentDidMount() {
//         this._isMounted = true;
//         if(this.state.id != null){
//         fetch('https://pensjon-preg-logviewer-api.dev-fss.nais.io/api/log/'+this.state.id
//         ,{
//           headers : {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//            },
//            mode: 'no-cors'
//         }
//         )
//           .then(res => res.json())
//           .then(
//             (result) => {
//                 if(this._isMounted){
//                     console.log("mouted" + result)
//               this.setState({
//                 isLoaded: true,
//                 request: result[1]
//               })
//             }
//             },
//             (error) => {
//               this.setState({
//                 isLoaded: false,
//                 error
//               });
//             }
//           )
//         }
//       }
//
//     useEffect(() => {
//     // GET request using fetch inside useEffect React hook
//     fetch('https://api.npms.io/v2/search?q=react')
//     .then(response => response.json()) }, [])
//
//       componentWillUnmount() {
//         this._isMounted = false;
//       }
//
//        render(){
//
//            return(
//
//                <div class ="RequestPane">
//                    <h1>REQUEST</h1>
//                    request id: {this.state.id}
//                    loaded: {this.state.isLoaded}
//                    content: {this.state.result}
//                </div>
//            )
//
//
//         //    if(this.state.isLoaded){
//         // {this.state.verdier.map((data,key) => {
//         //     return(
//         //         <div>
//         //             {data.environment}
//         //         </div>
//         //     )})}
//         // }
//         //     console.log("ID: "+ this.state.id);
//         //     console.log("isLoaded: "+ this.state.isLoaded);
//         // return(
//         //
//         //     <div class ="RequestPane">
//         //         <h1>REQUEST</h1>
//         //         request id: {this.state.id}
//         //     </div>
//         // )
//       }
// }
export default RequestPane
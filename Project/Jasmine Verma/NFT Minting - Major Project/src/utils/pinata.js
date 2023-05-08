import axios from 'axios';
import FormData from 'form-data';

// TODO - 8 create a function sendFileToIPFS and send a POST request to
// pinata api using you api key to get the cid of the image blob
export const sendFileToIPFS = async (ImageBlob) => {

        try {

            const formData = new FormData();
            formData.append("file", ImageBlob);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    pinata_api_key: '515ae2cdf69f6c2c56e6',
                    pinata_secret_api_key: '11da76c8f01ab4c2bf6d6d8b92a044de6dba768efd3fa117bbd310e0225d5b92',
                    "Content-Type": "multipart/form-data"
                },
            });

            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

            console.log(ImgHash); 

         return{
            sucess : true,
            Ipfs : ImgHash,
        };

        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
            return{
                sucess : false,
                Ipfs : "",
            };
        }
    }



// TODO 10.2 - create a jsonToPinata helper function to pin the json metadata to pinata
const jsonToPinata = async (json) =>  {

    console.log('inside JSON to pinata');
    try {

        const data = JSON.stringify(json);

        var config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: { 
              'Content-Type': 'application/json', 
              pinata_api_key: '4ef3034ab4ea440b917c',
              pinata_secret_api_key: '2a1824d7d892f41cfe6206f49d87847938621151b5c0defe254f1ec357b5304e',
            },
            data : data
          };
          
          const res = await axios(config);
        return{
            sucess : true,
            Ipfs : res.data.IpfsHash,
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            Ipfs : "",
        };
        
    }

}


// TODO 10.1 - create a pinataWrapper function to convert the name , event name and image
// into metadata of a Tezos NFT and pin it to pinata to return the ipfs cid 
export const pinataWrapper = async (name , event , image) =>  {

    try {
        let data = {};
        data.name = "Hack 7 NFT";
        data.description = "This NFT certifies that you have participated in H7D Hackathon!";
        data.artifactUri = image;
        data.displayUri = image;
        data.thumbnailUri = image;
        data.decimals = 0 ;

        data.attributes = [
            {
            "name": "Owner Name",
            "value": name,
            },
            {
            "name": "Event Name",
            "value": event,
            }
        ];
        
        data.creators =  [
            "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L"
            ];
        data.isBooleanAmount = false;
        data.symbol = "H7D";
        data.rights =  "All right reserved.";
        data.shouldPreferSymbol = true;

        const res = await jsonToPinata(data);

        return{
            sucess : true,
            Ipfs : res.Ipfs,
        };

    } catch (error) {
        console.log(error);
        return{
            sucess:false,
            Ipfs : "",
        };
        
    }

}

// module.exports = {sendFileToIPFS , pinataWrapper};

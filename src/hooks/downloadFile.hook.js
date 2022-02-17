import React,{useState} from "react";
import RNFetchBlob from "rn-fetch-blob";



export const DownloadFileHook =()=>{
    const [pdfFile, setPdfFile] = useState({
        progressVal:0,
        path: null,
        isDone: false
    })

    const [photoData, setPhotoData] = useState({
        progressVal:0,
        path: null,
        isDone: false
    })

    const downloadPdfFile = async (pathFile)=>{
        try {
            let dirs = RNFetchBlob.fs.dirs
            RNFetchBlob
                .config({
                    // response data will be saved to this path if it has access right.
                    path : dirs.DownloadDir + '/testFile4.pdf'
                })
                .fetch('GET', pathFile, {
                    //some headers ..
                })
                .progress({count: 100},(received, total) => {
                    setPdfFile({
                        ...pdfFile,
                        isDone: false,
                        progressVal: (received/total)*100
                    })
                    // console.log('-----progress:', received / total)
                })
                .then((res) => {
                    // the path should be dirs.DocumentDir + 'path-to-file.anything'
                    console.log('The file saved to ', res.path())
                    setPdfFile({
                        isDone: true,
                        path: res.path(),
                        progressVal: 100
                    })
                })
        }catch (e){
            console.log(e)
        }
    }
    //

    const downloadPhoto = async (pathFile)=>{
        try {
            let dirs = RNFetchBlob.fs.dirs
            RNFetchBlob
                .config({
                    // response data will be saved to this path if it has access right.
                    path : dirs.DownloadDir + '/photo.jpg'
                })
                .fetch('GET', pathFile, {
                    //some headers ..
                })
                .progress({count: 100},(received, total) => {
                    setPhotoData({
                        ...photoData,
                        isDone: false,
                        progressVal: (received/total)*100
                    })
                    // console.log('-----progress:', received / total)
                })
                .then((res) => {
                    // the path should be dirs.DocumentDir + 'path-to-file.anything'
                    console.log('The file saved to ', res.path())
                    setPhotoData({
                        isDone: true,
                        path: res.path(),
                        progressVal: 100
                    })
                })
        }catch (e){
            console.log(e)
        }
    }

    //------------->
    return {
        downloadPdfFile,
        pdfFile,
        photoData,
        downloadPhoto
    }
}
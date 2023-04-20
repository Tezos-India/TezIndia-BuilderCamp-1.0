import React, { useEffect, useState } from 'react'
import './Generate.css'
import { Revise } from 'revise-sdk'
import { slice } from 'lodash'

const Generator = () => {
  let url = localStorage.getItem('code').toString()
  url = url.slice(10, -1)
  const [imageurl, setImageurl] = useState(url)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [attributes, setAttributes] = useState([])
  const [tokenID, setTokenID] = useState()
  const [key, setKey] = useState('')
  const [attributename, setAttributename] = useState()
  const [attributeval, setAttributeval] = useState()
  const [collections, setCollections] = useState([])
  const [currcollection, setCurrcollection] = useState({})
  const [step, setStep] = useState(0)
  const [nftid, setNftid] = useState('')

  useEffect(() => {
    setStep(0)
  }, [])

  async function getcollections() {
    const revise = new Revise({ auth: key })
    return await revise.fetchCollections()
  }

  async function generatenft() {
    const revise = new Revise({ auth: key })

    let attrs = attributes.map((data) => {
      let attname = data[0]
      let attvalue = data[1]
      let obj = {}
      obj[attname] = attvalue
      return obj
    })

    console.log(attrs)
    const res = await revise.addNFT(
      {
        name: name,
        tokenId: tokenID,
        description: description,
        image: imageurl,
      },
      attrs,
      currcollection.id
    )
    console.log(res)
    setNftid(res.id)
    setStep(2)
    setAttributename('')
    setAttributeval('')
    setAttributes([])
    setImageurl('')
    setName('')
    setDescription('')
    setTokenID('')
  }

  return (
    <div className='wrapper'>
      <div className='generate'>
        <div className='generate__title'>Generate dNFT</div>
        <div className='generate__subtitle'>
          Generate your own dNFT using revise console
        </div>
        {step === 0 ? (
          <div className='main3'>
            <div className='generate1__sec'>
              <input
                type='text'
                id='key'
                className='generate1__input'
                placeholder='Revise Key'
                onChange={(e) => {
                  setKey(e.target.value)
                }}
              />

              <div
                className='generate1__btn'
                onClick={() => {
                  let coll = getcollections().then((val) => {
                    console.log('qqqq', val)
                    setCollections(val)
                  })
                  console.log('weeeee', collections)
                }}>
                Get Collections
              </div>
            </div>
            <div className='generate1__collections'>
              {console.log(collections)}
              {collections.map((col, idx) => {
                return (
                  <div className='row'>
                    <div className='row__name'>{col.collectionName}</div>
                    <div className='row__uri'>{col.collectionURI}</div>
                    <div className='row__id'> {col.id} </div>
                    <div className='row__owner'> {col.ownerId} </div>
                    <div
                      className='row__add'
                      onClick={() => {
                        setCurrcollection({
                          name: col.collectionName,
                          id: col.id,
                          owner: col.ownerId,
                          uri: col.collectionURI,
                        })
                        setStep(1)
                      }}>
                      +
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : step === 1 ? (
          <div classname='main3' style={{ height: '100%', width: '100%' }}>
            <div className='generate__current'>
              <img
                className='generate__current__image'
                src={imageurl}
                alt='Not set'
              />
              <div className='generate__current__info'>
                <div className='generate__current__name'>NAME : {name}</div>
                <div className='generate__current__description'>
                  DESCRIPTION : {description}
                </div>
                <div className='generate__current__description'>
                  TOKEN ID : {tokenID}
                </div>
                <div className='generate__current__description'>
                  COLLECTION : {currcollection.name}
                </div>
              </div>
              <div className='generate__current__attributes'>
                <div className='generate__current__wrap'>
                  <div className='generate__current__attrhead'>
                    ATTRIBUTE NAME
                  </div>
                  <div className='generate__current__attrhead'>
                    INITIAL VALUE
                  </div>
                </div>
                {attributes.map((attribute, indx) => {
                  return (
                    <div className='generate__current__wrap'>
                      <div className='generate__current__attributename'>
                        {attribute[0]}
                      </div>
                      <div className='generate__current__attributevalue'>
                        {attribute[1]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='form'>
              <div className='form__sec'>
                <div className='form__inputwrap'>
                  <label className='form__label' for='imageurl'>
                    ImageURL
                  </label>
                  <input
                    className='form__imageurl'
                    type='text'
                    id='imageurl'
                    value={imageurl}
                  />
                </div>
                <div className='form__inputwrap'>
                  <label className='form__label' for='name'>
                    Name
                  </label>
                  <input
                    className='form__name'
                    type='text'
                    id='name'
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className='form__sec'>
                <div className='form__inputwrap'>
                  <label className='form__label' for='description'>
                    Description
                  </label>

                  <input
                    className='form__description'
                    type='text'
                    id='description'
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                </div>
                <div className='form__inputwrap'>
                  <label className='form__label' for='tokenid'>
                    TokenID
                  </label>
                  <input
                    className='form__tokenid'
                    type='number'
                    id='tokenid'
                    onChange={(e) => {
                      setTokenID(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className='form__attr'>
                <div className='form__inputwrap'>
                  <label className='form__label' for='description'>
                    Attribute Name
                  </label>
                  <input
                    className='form__attributename'
                    type='text'
                    value={attributename}
                    onChange={(e) => {
                      setAttributename(e.target.value)
                    }}
                  />
                </div>
                <div className='form__inputwrap'>
                  <label className='form__label' for='description'>
                    Attribute Value
                  </label>
                  <input
                    className='form__attributevalue'
                    type='text'
                    value={attributeval}
                    onChange={(e) => {
                      setAttributeval(e.target.value)
                    }}
                  />
                </div>
                <div
                  className='form__add'
                  onClick={() => {
                    console.log(attributename, attributeval)
                    setAttributes([
                      ...attributes,
                      [attributename, attributeval],
                    ])
                    setAttributeval('')
                    setAttributename('')
                  }}>
                  +
                </div>
              </div>
            </div>
            <div className='form__genwrap'>
              <div
                className='form__gen'
                onClick={() => {
                  generatenft()
                }}>
                Generate
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <div className='main2'>
            <div className='nftid'>{nftid}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Generator

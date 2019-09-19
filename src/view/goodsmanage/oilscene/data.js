export default [{
    "title": "Business(商业)",



    render: (h, {
      root,
      node,
      data
    }) => {
      return h(
        'span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-folder'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
      )
    },
    "children": [{
      "id": "3fbc154c4c304ce8a8f452b14e09cf96",
      "title": "Hotel(酒店)",


      "children": [{
        "id": "f8ef7ba5dd63413b89eade92f31d1228",
        "title": "Lobby(大堂)",


        "children": null
      }, {
        "id": "a0da6ed2e6294d11be66d649c8a901f6",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "67ccbf4e12f44ca1bdaa993fbc1dbe87",
        "title": "Elevator Lobby(电梯口)",


        "children": null
      }, {
        "id": "cb2536ad18c941e1a5d4f926ccb922a0",
        "title": "Room(房间)",


        "children": null
      }, {
        "id": "0cff9187efa24eed805b28dca4a56c10",
        "title": "Meeting Room(会议室)",


        "children": null
      }, {
        "id": "de42abaa5eda4baf8351362c23e4fb72",
        "title": "Washroom(卫生间)",


        "children": null
      }]
    }, {
      "id": "3ba4d20ed04c4214b41d7528b9d8525d",
      "title": "Canteen(餐厅)",


      "children": [{
        "id": "0e032a94542a4b4083a1a5442484f863",
        "title": "Bar(酒吧)",


        "children": null
      }, {
        "id": "18a089c45aa64276b92f4f7f616e2525",
        "title": "coffee shop(咖啡厅)",


        "children": null
      }, {
        "id": "f490b124d77f466c8674e6d6259cdb0f",
        "title": "Western Resturant(西餐厅)",


        "children": null
      }, {
        "id": "d1b853f78d2948bfb338c4c23ed61d7f",
        "title": "Chinese Resturant(中餐厅)",


        "children": null
      }]
    }, {
      "id": "98a1a1d54dab4e0eaa8aafc242d3f400",
      "title": "cosmetology institutions(美容机构)",


      "children": [{
        "id": "dca7be9c76c54ee480721e78530a6537",
        "title": "SPA(SPA)",


        "children": null
      }, {
        "id": "66f7f5b67fd64e2f8614a73944dcbb14",
        "title": "SALON(SALON)",


        "children": null
      }]
    }, {
      "id": "21c6b2feff0a47e9b9196e47b3746790",
      "title": "government office building(政府写字楼)",


      "children": [{
        "id": "0f7eda646e3648aeb53baeb130db1281",
        "title": "Reception(前台)",


        "children": null
      }, {
        "id": "20285ea849d24c0082e6b3546bfb639c",
        "title": "Meeting Room(会议室)",


        "children": null
      }, {
        "id": "d3164a6142424e3cadffc5b82a370ebb",
        "title": "Resting room(休息室)",


        "children": null
      }, {
        "id": "e216a44ef3304470876b45f15e5dd77e",
        "title": "office(独立办公室)",


        "children": null
      }, {
        "id": "bfb3916ba35a431bb7be4d0ca96938e5",
        "title": "openoffice(开放式办公室)",


        "children": null
      }, {
        "id": "794a7dfce5514ba8b7abddbbee9c7582",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "fec543dff3db447c9045505ef8298f28",
        "title": "Washroom(卫生间)",


        "children": null
      }]
    }, {
      "id": "90db7b8f85b94dafb3b5fc344b54ad6a",
      "title": "Company office building(企业写字楼)",


      "children": [{
        "id": "35ad6a8fa1fb427081f311882ebfe9f7",
        "title": "Reception(前台)",


        "children": null
      }, {
        "id": "a2a8f10b053a47d48d2e66cf0a3a8763",
        "title": "Meeting Room(会议室)",


        "children": null
      }, {
        "id": "235c0ff0837f4a00935d2b80a86e0e39",
        "title": "Resting room(休息室)",


        "children": null
      }, {
        "id": "4e1e17b4d8724e919c2a07feb8a7829f",
        "title": "office(独立办公室)",


        "children": null
      }, {
        "id": "8277f7da3be544aab514a605d87c9006",
        "title": "openoffice(开放式办公室)",


        "children": null
      }, {
        "id": "849a65cc08c64a7697c573aaff8c7c94",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "b65b1f7f4f6147c59d1ae6012e328b01",
        "title": "Washroom(卫生间)",


        "children": null
      }]
    }, {
      "id": "89a80a1dc2bf402582dad28e05e75ada",
      "title": "Shopping Mall(购物中心)",


      "children": [{
        "id": "cd270df3bc3340f7b6f6f102b91f29aa",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "5ffc7e786e5e4d87a43d9cb7925e9be3",
        "title": "Office(独立办公室)",


        "children": null
      }, {
        "id": "0d598c2c19d34176a353087fd834cd27",
        "title": "Washroom(洗手间)",


        "children": null
      }]
    }]
  },
  {
    "title": "Residence(住宅)",



    render: (h, {
      root,
      node,
      data
    }) => {
      return h(
        'span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-folder'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
      )
    },
    "children": [{
      "id": "dfef5fac28db4d799b1462b6394c986e",
      "title": "apartment(公寓)",


      "children": [{
        "id": "4e1902cfd4c641e383a2830492ba444f",
        "title": "Living room(客厅)",


        "children": null
      }, {
        "id": "8902c0261be5414ebf8317b9d67ec1e2",
        "title": "dining hall(饭厅)",


        "children": null
      }, {
        "id": "cc5460a701b64163935e161f496c1b72",
        "title": "bedroom(卧室)",


        "children": null
      }, {
        "id": "768dfe26359543f8a8fb3124f363a0df",
        "title": "study room(书房)",


        "children": null
      }, {
        "id": "7d1bf18c16e644ccabed7219dac00c9f",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "eb47ae9a1fd6421087d150616a9e0f1e",
        "title": "Washroom(卫生间)",


        "children": null
      }, {
        "id": "9303656e34a24c5f815223d8a4243718",
        "title": "bar counter(吧台)",


        "children": null
      }, {
        "id": "10271d5142de47f9875881bc11ce3b7c",
        "title": "soho(家庭办公室)",


        "children": null
      }, {
        "id": "ee2db717068543029ba10377886f592b",
        "title": "Playroom(娱乐室)",


        "children": null
      }]
    }, {
      "id": "fb08ecfd995344cca3b4ef2e74af15e9",
      "title": "Villa(别墅)",


      "children": [{
        "id": "3512c95403b9458f96a702bb244618cb",
        "title": "Living room(客厅)",


        "children": null
      }, {
        "id": "f0877ef36f03485dac4f7e9bda385365",
        "title": "dining hall(饭厅)",


        "children": null
      }, {
        "id": "0c7507edaf4f4731adfca6f99a03f846",
        "title": "bedroom(卧室)",


        "children": null
      }, {
        "id": "47010328125e4173a9bc045cd4f1143b",
        "title": "study room(书房)",


        "children": null
      }, {
        "id": "0d896a8413c247bd9e90e9ca3360c9c9",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "def1778e8b9a430c8c616022a8b37edd",
        "title": "Washroom(卫生间)",


        "children": null
      }, {
        "id": "471eae8e8b034480b133a62c0a4c99ed",
        "title": "bar counter(吧台)",


        "children": null
      }, {
        "id": "07cb4ab1b5ef4ce6b8cb884a45aef2e6",
        "title": "soho(家庭办公室)",


        "children": null
      }, {
        "id": "976ab67201564090a4debcbe40d9e0c3",
        "title": "Playroom(娱乐室)",


        "children": null
      }]
    }, {
      "id": "b9759ec658214aeb9b417a7549aba547",
      "title": "mansion(豪宅)",


      "children": [{
        "id": "49823c75fa984ad4829891e637e89c0b",
        "title": "Living room(客厅)",


        "children": null
      }, {
        "id": "1898441997ed40cb817d280ae8730db2",
        "title": "dining hall(饭厅)",


        "children": null
      }, {
        "id": "f3b008256ee64ddb95e2278d1d47bd94",
        "title": "bedroom(卧室)",


        "children": null
      }, {
        "id": "689e21e579994b43acc1536c250f00bc",
        "title": "study(书房)",


        "children": null
      }, {
        "id": "8e42eecee1974821a0defbd9ab458407",
        "title": "Aisle(走廊)",


        "children": null
      }, {
        "id": "c7b54abcb80046a297089e20ecde87f5",
        "title": "Washroom(卫生间)",


        "children": null
      }, {
        "id": "1dc1cede0dcc44a5b7bc7a9e4bad5753",
        "title": "bar counter(吧台)",


        "children": null
      }, {
        "id": "33c0bcdf3f214d8a8e507c9c08553bc9",
        "title": "soho(家庭办公室)",


        "children": null
      }, {
        "id": "71abf187b43546f2a25f3378863c0ae6",
        "title": "Playroom(娱乐室)",


        "children": null
      }]
    }]
  },
  {
    "title": "public place(公共场所)",



    render: (h, {
      root,
      node,
      data
    }) => {
      return h(
        'span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-folder'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
      )
    },
    "children": [{
      "id": "71752f9dabfc4a64a13dc234bf6e9644",
      "title": "Library(图书馆)",


      "children": [{
        "id": "2e5f1ffcab1142b8a89288cbd9225fa3",
        "title": "reading room(阅读室)",


        "children": null
      }, {
        "id": "5dc79e3f741042129b4d3d7ebe562825",
        "title": "Washroom(卫生间)",


        "children": null
      }, {
        "id": "cf137329a1ea4995ac4dc260bc9d7cf1",
        "title": "Office(办公室)",


        "children": null
      }, {
        "id": "7f97420eeca54f3886a624b6c3c9bae0",
        "title": "Book-storing Room(藏书室)",


        "children": null
      }]
    }, {
      "id": "706ad8a62b274fdd9579a8e34313be92",
      "title": "Museum(博物馆)",


      "children": [{
        "id": "50c3d25af86f408787906eb7573c4cb5",
        "title": "exhibition room(展览厅)",


        "children": null
      }, {
        "id": "b95a5085da7f469a9712151e48414332",
        "title": "Office(独立办公室)",


        "children": null
      }, {
        "id": "550d5fc1ace748a79e942b1651640093",
        "title": "Washroom(卫生间)",


        "children": null
      }]
    }, {
      "id": "9eee2adae79b496eb7bbde49fabd1d5b",
      "title": "Hospital(医院)",


      "children": [{
        "id": "99f95f2d867d4c65a2c09df235a47246",
        "title": "Reception(前台)",


        "children": null
      }, {
        "id": "dc6af5d7950f4cad8cf7287d93ba2d49",
        "title": "Office(独立办公室)",


        "children": null
      }, {
        "id": "4558b30c3c0f44a6abccc40504742459",
        "title": "Ward(病房)",


        "children": null
      }]
    }, {
      "id": "e263063e112d4ab79676c8beef3d096a",
      "title": "Station(公共车站)",


      "children": [{
        "id": "bbadb8c144e74a1b8be8d5c482ce65c6",
        "title": "Waiting Hall(候车大厅)",


        "children": null
      }]
    }, {
      "id": "787abb30a6624706bcca9a0f43978fed",
      "title": "association(协会组织)",


      "children": [{
        "id": "9879382fe4de403b95c5f2513000638a",
        "title": "Reception(前台)",


        "children": null
      }, {
        "id": "e70fe6ed44114dd9a4efacfef66ded75",
        "title": "Office(独立办公室)",


        "children": null
      }, {
        "id": "2decf8f79702437494f0c8e49fc3abdb",
        "title": "Washroom(卫生间)",


        "children": null
      }]
    }, {
      "id": "14d8d4c0225946db88e400b86f8033f9",
      "title": "Church(教堂教会)",


      "children": [{
        "id": "34ff04f4b7314ef684ad7dc46845244f",
        "title": "Church(教堂)",


        "children": null
      }]
    }, {
      "id": "4b61c6b80bb04a9c83dc041ffa6e8958",
      "title": "charity(慈善机构)",


      "children": [{
        "id": "8c6a38bf1f2047799b0f29fa3247b941",
        "title": "Reception(前台)",


        "children": null
      }, {
        "id": "b85b87352982468fadf6ee3610cc716e",
        "title": "Office(独立办公室)",


        "children": null
      }, {
        "id": "80734496ea2846f18b0fab49bc662883",
        "title": "Washroom(卫生间)",


        "children": null
      }]
    }]
  }
]

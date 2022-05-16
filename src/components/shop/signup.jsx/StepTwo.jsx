import { useState } from 'react';
import provinces from '../../../json/refprovince.json';
import barangays from '../../../json/refbrgy.json';
import cities from '../../../json/refcitymun.json';

const StepTwo = ({ mobile,setMobile,setAddress,address,setBarangay,barangay,province,setProvince,city,setCity,postalCode,setPostalCode,setActiveStep }) => {

  const [provCode,setProvCode] = useState('');  
  const [cityCode,setCityCode] = useState('');

  const selectProvince = (provName) => {

    let firstUpper = provName[0];

    for(let i = 1; i < provName.length; i++) {
        firstUpper += provName[i].toLowerCase();
    }
    setProvince(firstUpper);
    const provinceCode = provinces.RECORDS.filter(province => province.provDesc === provName).map(province => province.provCode);
    setProvCode(provinceCode[0]);
  }

  const selectCity = (cityName) => {
    let firstUpper = cityName[0];

    for(let i = 1; i < cityName.length; i++) {
        firstUpper += cityName[i].toLowerCase();
    }
      setCity(firstUpper);
      const cityCode = cities.RECORDS.filter(city => city.citymunDesc === cityName).map(city => city.citymunCode);
      setCityCode(cityCode[0]);
  }

  return (
    <div className="w-full">
        <div className="flex flex-col gap-2">
            <label htmlFor="mobile">Mobile Number:</label>
            <input className="user-auth" type="text" placeholder="Mobile Number" 
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="address">Address:</label>
            <input className="user-auth" type="text" placeholder="House no. & Street" 
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
            />
        </div>
        <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="province">Province:</label>
                <select value={province.toUpperCase()} onChange={(e) => selectProvince(e.target.value)} className="user-auth" required>
                    <option hidden>Select your province</option>
                    { provinces.RECORDS.map((province) => (
                        <option key={province.id} value={ province.provDesc }>{ province.provDesc[0]+province.provDesc.slice(1,province.provDesc.length).toLowerCase() }</option>
                    )) }
                </select>
            </div>
            
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="city">City:</label>
                { province === '' ? <p className="user-auth">Select Province first</p> : <select value={city.toUpperCase()} onChange={(e) => selectCity(e.target.value)} className="user-auth" required>
                    <option hidden>Select your city</option>
                    { cities.RECORDS.filter(city => city.provCode === provCode).map((city) => (
                        <option key={city.id} value={ city.citymunDesc }>{ city.citymunDesc[0]+city.citymunDesc.slice(1,city.citymunDesc.length).toLowerCase() }</option> 
                    )) }
                </select> }
            </div>
        </div>
        <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="barangay">Barangay:</label>
                { city === '' ? <p className="user-auth">Select city first</p> : <select value={barangay} onChange={(e) => setBarangay(e.target.value)} className="user-auth" required>
                    <option hidden>Select your barangay</option>
                    { barangays.RECORDS.filter(barangay => barangay.citymunCode === cityCode).map((barangay) => (
                        <option key={barangay.id} value={ barangay.brgyDesc }>{ barangay.brgyDesc }</option>
                    )) }
                </select> }
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="postalcode">Postal Code:</label>
                <input onKeyPress={(e) => e.key === 'Enter' && setActiveStep('step three')} className="user-auth" type="text"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                    required
                />
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div onClick={() => setActiveStep('step one')} className="w-32 cursor-pointer text-center flex flex-col mt-3">
                <span className="bg-gray-900 text-gray-100 p-2 rounded">Previous</span>
            </div>
            <div onClick={() => setActiveStep('step three')} className="w-32 cursor-pointer text-center flex flex-col mt-3">
                <span className="bg-gray-900 text-gray-100 p-2 rounded">Next</span>
            </div>
        </div>
    </div>
  )
}

export default StepTwo
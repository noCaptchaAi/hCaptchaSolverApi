####
# pip install undetected_chromedriver selenium pillow requests flask waitress
# Fill your own UID and API KEY bellow before using.
# Make sure you already have selenium, chrome and undetected_chromedriver installed.
# If you have any issue please create a github issue or you can ask help on Discord https://discord.gg/E7FfzhZqzA
# 
####
########## Fill uid and apikey like this. ############################
# uid="62c6bf7eb1e76d24e366" #Replace with your own UID
# apikey="62d0243f-7107-67ee-f312-09d8f5af84f3" #Replace with your own apikey



uid="" #Replace with your own UID
apikey="" #Replace with your own apikey

api_url = 'https://free.nocaptchaai.com/api/solve'

from genericpath import exists
import time

import undetected_chromedriver as uc
from selenium import webdriver
import re, requests, json

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from selenium.common.exceptions import (
    ElementNotVisibleException,
    ElementClickInterceptedException,
    WebDriverException,
    TimeoutException,
)

options = webdriver.ChromeOptions()
# options.binary_location = "C:\\Users\\ROG\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"
# options.binary_location = "C:\\Users\\ROG\\Documents\\Chromium-Portable-win64-codecs-sync-oracle\\bin\\chrome.exe"
# options.add_argument("start-maximized")
# options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
driver = uc.Chrome(options=options, use_subprocess=True)

def main():
    driver.implicitly_wait(30)
    driver.get('https://shimuldn.github.io/hCaptchaSolverApi/demo_data/demo_sites/2/')
    
    # driver.get('https://accounts.hcaptcha.com/demo?sitekey=72c1c641-f24b-4749-b3fd-7955dca2c651&secret=0xcc480ac03eB7723e2471c292b2B7D4544519C49B')
    time.sleep(25)
    WebDriverWait(driver, 25, ignored_exceptions=ElementNotVisibleException).until(
        EC.frame_to_be_available_and_switch_to_it(
            (By.XPATH, "//iframe[contains(@title,'checkbox')]")
        )
    )
    
    WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.ID, "checkbox"))).click()
    driver.switch_to.default_content()
    HOOK_CHALLENGE = "//iframe[contains(@title,'content')]"
    WebDriverWait(driver, 15, ignored_exceptions=ElementNotVisibleException).until(
            EC.frame_to_be_available_and_switch_to_it((By.XPATH, HOOK_CHALLENGE))
        )
    time.sleep(20)

    def solve_hcaptcha(driver, EC):
        print("Solving hcaptcha")
        _obj = WebDriverWait(driver, 25, ignored_exceptions=ElementNotVisibleException).until(
            EC.presence_of_element_located((By.XPATH, "//h2[@class='prompt-text']"))
        )
        time.sleep(1)
        target=re.split(r"containing a", _obj.text)[-1][1:].strip()
        print(f'hcaptcha target {target}')

        WebDriverWait(driver, 10, ignored_exceptions=ElementNotVisibleException).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[@class='task-image']"))
        )
        images_div = driver.find_elements(By.XPATH, "//div[@class='task-image']")

        image_data={}

        # Getting the data for api server format
        for item in images_div:
            name=item.get_attribute("aria-label")
            number=int(name.replace("Challenge Image ", ""))-1
            image_style = item.find_element(By.CLASS_NAME, "image").get_attribute("style")
            try:
                url = re.split(r'[(")]', image_style)[2]
            except:
                print("Error in getting image url")
                url=""
            image_data[number]=url
            # item.click()

        # Doing final formating for api by adding mandatory target data_type site_key site and images 
        data_to_send={}
        data_to_send['target']=target
        data_to_send['data_type']="url"
        data_to_send['site_key']="dasds"
        data_to_send['site']="jj"
        data_to_send['images']=image_data
        
        full_url=api_url
        

        # Sending the request to api server
        # print(json.dumps(image_data))   # uncomment this to see the request data
        print("Sending request to api server")
        r = requests.post(url = full_url, headers={'Content-Type': 'application/json', 'uid': uid,
        'apikey': apikey}, data = json.dumps(data_to_send))

        # printing the response from api server
        print(f'Response received from api server {r.text}')

        if r.json()['status'] == "new":
            time.sleep(2)
            status=requests.get(r.json()['url'])
            # print(status.json())
            if status.json()['status'] == "solved":
                # for item in images_div:
                #     name=item.get_attribute("aria-label")
                #     nn=int(name.replace("Challenge Image ", ""))-1
                print(status.json())
                    # if status.json()['solution'][nn]:
                    #     time.sleep(0.05)
                    #     item.click()
                    # for res in status.json()['solution']:
                    #     print(status.json()['solution'][res])
                sol=status.json()['solution']
                # r=[]
                # for i in sol:
                #     if sol[i] == "True":
                #         print(sol[i])
                #         r.append(int(i))
                print(sol)
                # for ii in sol:
                #     print(ii, type(ii))
                    # time.sleep(10)
                for item in images_div:
                    name=item.get_attribute("aria-label")
                    nn=int(name.replace("Challenge Image ", ""))-1
                    # print(nn)
                    
                    # print("clicking image "+str(nn))
                    if str(nn) in sol:
                        # item.click()
                        
                        print("clicking image "+str(nn))
                        # driver.execute_script("arguments[0].click();", item)
                        item.click()
                        time.sleep(.5)
                    # if r.json()['solution'][str(nn)]:
                    #     item.click()
                    #     # driver.execute_script("arguments[0].click();", item)
                    #     time.sleep(5)
                        
                    #     print("clicking image"+str(nn))

                ## clicking the button
                button=WebDriverWait(driver, 35, ignored_exceptions=ElementClickInterceptedException).until(
                        EC.element_to_be_clickable(
                            (By.XPATH, "//div[@class='button-submit button']"))
                    )
                time.sleep(1)
                titel=button.get_property("title")
                print(titel)
                if(titel=="Submit Answers"):
                    button.click()
                elif(titel=="Next Challenge"):
                    button.click()
                    solve_hcaptcha(driver, EC)
                elif(titel=="Skip Challenge"):
                    print("Skip button")
                else:
                    print("button not found")
                

        elif r.json()['status'] == "skip":
            
            print(r.json())
            WebDriverWait(driver, 35, ignored_exceptions=ElementClickInterceptedException).until(
                EC.element_to_be_clickable(
                    (By.XPATH, "//div[@class='refresh button']"))
            ).click()
            solve_hcaptcha(driver, EC)
            return  


        
        time.sleep(20)
        # Clicking the images to solve the captcha
        try:
            if r.json()['success']:
                for item in images_div:
                    name=item.get_attribute("aria-label")
                    nn=int(name.replace("Challenge Image ", ""))-1
                    if r.json()['solution'][str(nn)]:
                        item.click()
                        # driver.execute_script("arguments[0].click();", item)
                        time.sleep(5)
                        
                        print("clicking image"+str(nn))


                time.sleep(20)
                button=WebDriverWait(driver, 35, ignored_exceptions=ElementClickInterceptedException).until(
                    EC.element_to_be_clickable((By.XPATH, "//div[@class='button-submit button']"))
                )
                titel=button.get_property("title")
                print(titel)
                if(titel=="Submit Solution"):
                    button.click()
                elif(titel=="Next Challenge"):
                    button.click()
                    solve_hcaptcha(driver, EC)
                elif(titel=="Skip Challenge"):
                    print("Skip button")
                else:
                    print("button not found")
        except:
            WebDriverWait(driver, 35, ignored_exceptions=ElementClickInterceptedException).until(
                EC.element_to_be_clickable(
                    (By.XPATH, "//div[@class='refresh button']"))
            ).click()
            solve_hcaptcha(driver, EC)  
        try:
            error_txt=WebDriverWait(driver, 1, 0.1).until(
                EC.visibility_of_element_located((By.XPATH, "//div[@class='error-text']"))
            )
            print(f'error found {error_txt}')
        except:
            print(r.json())


        for i in range(5):
            try:
                WebDriverWait(driver, 1).until(
                    EC.presence_of_element_located((By.XPATH, "//div[@class='task-image']"))
                )
                solve_hcaptcha(driver, EC)
            except:
                print("hcaptcha Solved successfully")
                break



    def is_challenge_image_clickable(driver):
        try:
            WebDriverWait(driver, 1).until(
                EC.presence_of_element_located((By.XPATH, "//div[@class='task-image']"))
            )
            return True
        except TimeoutException:
            return False
        

    # solve_hcaptcha(driver, EC)

    print(is_challenge_image_clickable(driver))
    if is_challenge_image_clickable(driver):
        solve_hcaptcha(driver, EC)
    else:
        print("All done here")
        # driver.close()

try:
    main()
except Exception as e:
    print(e)

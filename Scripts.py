import random
import pandas as pd
import numpy as np
from PIL import Image
import os
import statistics
from sklearn.ensemble import HistGradientBoostingClassifier



def build_training_dataset(directory = r".\\Frames2", rebuild = True):
    fileL =[]
    labels = []


    for folder in os.listdir(directory):
        for file in os.listdir(".\\"+directory+"\\"+folder):
            labels.append(folder)
            fileL.append(Image.open(directory+ "\\"+folder+"\\"+ file).rotate(-90))

    if(rebuild):
        restarting_file  = open("train.csv", "w")
        restarting_file.write("label,")
        i = 1
        for z in range(784):
            if(i==784):
                restarting_file.write("pixel" + str(i))
            else:    
                restarting_file.write("pixel" + str(i) + ",")
            i = i + 1
        restarting_file.write("\n")
        restarting_file.close()


    c = 0

    newfile = open("train.csv", "a")
    for f in fileL:    
        new_f = f.resize((28,28))
        numArray = np.asarray(new_f)
        newNumArr = []
        b=0
        if numArray.ndim>3:
            b=1
        if(numArray.ndim>2):
            for i in numArray:
                row = []
                for j in i:
                    sum = 0
                    for k in range (len(j)-b):
                        sum+=j[k]
                    row.append(sum//(len(j)-b))
                newNumArr.append(row)
            numArray = newNumArr
        
        d1Arr = []

        for i in numArray:
            for j in i:
                d1Arr.append(j)

        numArray = d1Arr 


        i = 1
        newfile.write(labels[c]+",")
        for x in d1Arr:
            if(i==784):
                newfile.write(str(x))
            else:
                newfile.write(str(x) + ",")
            i=i+1
        newfile.write("\n")
        c+=1    

    newfile.close()






def build_testing_dataset(directory =  r".\\Hello2"):
    fileL =[]
    labels = []

    for folder in os.listdir(directory):
        for file in os.listdir(".\\"+directory+"\\"+folder):
            labels.append(folder)
            fileL.append(Image.open(directory+ "\\"+folder+"\\"+ file).rotate(-90))



    restarting_file  = open("test.csv", "w")
    restarting_file.write("label,")
    i = 1
    for z in range(784):
        if(i==784):
            restarting_file.write("pixel" + str(i))
        else:    
            restarting_file.write("pixel" + str(i) + ",")
        i = i + 1
    restarting_file.write("\n")
    restarting_file.close()    



    c = 0
    newfile = open("test.csv","a")
    for f in fileL:    

        new_f = f.resize((28,28))
        numArray = np.asarray(new_f)
        newNumArr = []
        if(numArray.ndim>2):
            for i in numArray:
                row = []
                for j in i:
                    sum = 0
                    for k in range (len(j)-1):
                        sum+=j[k]
                    row.append(sum//(len(j)-1))
                newNumArr.append(row)
            numArray = newNumArr
        
        d1Arr = []

        for i in numArray:
            for j in i:
                d1Arr.append(j)

        numArray = d1Arr 


        i = 1
        newfile.write(str(labels[c])+",")
        for x in d1Arr:
            if(i==784):
                newfile.write(str(x))
            else:
                newfile.write(str(x) + ",")
            i=i+1
        newfile.write("\n")
        c+=1    

    newfile.close()




def train_MLM():
    traindf = pd.read_csv("train.csv")

    train_Y = traindf["label"]
    train_X = traindf.drop("label", axis=1)

    print(train_Y)
    mlm = HistGradientBoostingClassifier()
    mlm.fit(train_X, train_Y)
    return mlm



def test_MLM(mlm):
    testdf = pd.read_csv("test.csv")
    test_Y = testdf["label"]
    test_X = testdf.drop("label", axis=1)
    answerdf = mlm.predict(test_X)
    print(answerdf)    
                    
    
if __name__ == "__main__":
    build_testing_dataset()
    build_training_dataset()
    mlm = train_MLM()
    test_MLM(mlm)

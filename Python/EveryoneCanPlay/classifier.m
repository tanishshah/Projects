function [classification,probability] = classifier(im)
    gn = googlenet;
    img = imresize(im,[224 224]); %googlenet needs a size of 224 224
    [classification, probability] = classify(gn,img);
    classification = char(classification);
    probability = num2str(max(probability));
end
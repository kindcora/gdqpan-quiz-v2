window.VLDC_CHAPTERS = window.VLDC_CHAPTERS || [];
window.VLDC_CHAPTERS.push({
  "id": "ch03",
  "number": 3,
  "short": "Cảm ứng ĐT",
  "title": "Cảm ứng điện từ",
  "glossary": [
    {
      "k": "$\\Phi$",
      "mean": "từ thông",
      "unit": "Wb = T·m$^2$",
      "note": "Từ thông một vòng: $\\Phi=\\int\\vec B\\cdot d\\vec S$. N vòng nhận cùng từ thông: từ thông móc vòng $\\Psi=N\\Phi$."
    },
    {
      "k": "$\\mathcal{E}$",
      "mean": "suất điện động cảm ứng",
      "unit": "V",
      "note": "$\\mathcal E=-d\\Psi/dt=-N\\,d\\Phi/dt$; một vòng có N = 1."
    },
    {
      "k": "$L$",
      "mean": "độ tự cảm",
      "unit": "H",
      "note": "Cuộn tuyến tính: $L=\\Psi/i=N\\Phi/i$; L không đổi thì $\\mathcal E_{tc}=-L\\,di/dt$."
    },
    {
      "k": "$M$",
      "mean": "hệ số hỗ cảm",
      "unit": "H",
      "note": "$\\mathcal{E}_2=-M dI_1/dt$"
    },
    {
      "k": "$W_m$",
      "mean": "năng lượng từ trường",
      "unit": "J",
      "note": "ống dây $W=\\frac12 LI^2$"
    }
  ],
  "formulas": [
    {
      "name": "Định luật cảm ứng (Faraday)",
      "latex": "$$\\mathcal E=-\\dfrac{d\\Psi}{dt}=-N\\dfrac{d\\Phi}{dt},\\qquad\\Psi=N\\Phi$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\Phi$",
          "mean": "từ thông qua một vòng; N vòng nhận cùng Φ",
          "unit": "Wb"
        },
        {
          "k": "$\\mathcal{E}$",
          "mean": "suất điện động",
          "unit": "V"
        }
      ],
      "when": "Suất điện động phụ thuộc tốc độ đổi từ thông móc vòng. Chiều đường vòng và pháp tuyến theo quy tắc bàn tay phải. Mạch hở vẫn có suất điện động; không có dòng dẫn liên tục qua khe cách điện lý tưởng."
    },
    {
      "name": "Định luật Lenz",
      "latex": "$$\\text{dòng cảm ứng chống nguyên nhân sinh ra nó}$$",
      "symbols": "",
      "sym": [
        {
          "k": "—",
          "mean": "chiều dòng",
          "unit": "—"
        }
      ],
      "when": "Nam châm N tới vòng: mặt đối diện đóng vai N (đẩy). Không phải “chống $\\vec{B}$ sẵn có” nếu $\\Phi$ đang giảm."
    },
    {
      "name": "Tự cảm",
      "latex": "$$L=\\dfrac{\\Psi}{i}=\\dfrac{N\\Phi}{i},\\qquad\\mathcal E_{tc}=-L\\dfrac{di}{dt}\\quad(L\\ \\text{không đổi})$$",
      "symbols": "",
      "sym": [
        {
          "k": "$L$",
          "mean": "độ tự cảm",
          "unit": "H"
        }
      ],
      "when": "Mạch từ tuyến tính. 1 H = 1 Wb/A tính theo từ thông móc vòng. Ống dài: $L=\\mu\\mu_0n^2V$."
    },
    {
      "name": "Hỗ cảm",
      "latex": "$$\\mathcal{E}_2=-M\\dfrac{dI_1}{dt}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$M$",
          "mean": "hỗ cảm",
          "unit": "H"
        }
      ],
      "when": "Không cần đã có $I_2$. Sạc không dây, biến áp, bếp từ (cuộn–nồi)."
    },
    {
      "name": "Năng lượng từ",
      "latex": "$$W=\\dfrac12 LI^2,\\quad \\omega_m=\\dfrac{\\vec{B}\\cdot\\vec{H}}{2}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$W$",
          "mean": "năng lượng ống dây",
          "unit": "J"
        },
        {
          "k": "$\\omega_m$",
          "mean": "mật độ năng lượng từ",
          "unit": "J/m$^3$"
        }
      ],
      "when": "Cuộn tuyến tính, L không đổi; mật độ năng lượng B·H/2 dùng cho môi trường tuyến tính, không trễ từ."
    },
    {
      "name": "Khung quay / máy phát",
      "latex": "$$\\Phi=BA\\cos\\omega t,\\quad\\Psi=N\\Phi,\\quad\\mathcal E=NBA\\omega\\sin\\omega t$$",
      "symbols": "",
      "sym": [
        {
          "k": "$N$",
          "mean": "số vòng",
          "unit": "—"
        },
        {
          "k": "$\\omega$",
          "mean": "tốc độ góc",
          "unit": "rad/s"
        }
      ],
      "when": "N vòng phẳng cùng diện tích, B đều, quay sao cho pháp tuyến tạo góc ωt với B; bỏ điện trở và tự cảm khi tính suất điện động cảm ứng do quay."
    }
  ],
  "traps": [
    {
      "title": "Có $B$ chưa chắc có dòng",
      "text": " Cần $d\\Phi/dt$. $B$ tĩnh, vòng đứng yên, $\\Phi$ không đổi $\\Rightarrow\\mathcal{E}=0$."
    },
    {
      "title": "Lenz không phải “ngược $B$ mọi lúc”",
      "text": " Chống <em>nguyên nhân đổi thông</em>: tăng $\\Phi$ thì $B_{\\mathrm{cảm}}$ ngược; giảm $\\Phi$ thì $B_{\\mathrm{cảm}}$ cùng chiều $B$ cũ."
    },
    {
      "title": "Foucault / Fucô",
      "text": " Dòng xoáy trong khối dẫn lớn khi $B(t)$ đổi. Bếp từ, phanh điện, tổn hao biến áp. Hiệu ứng mặt da: dòng dồn sát bề mặt ở tần số cao."
    },
    {
      "title": "Đèn quay tay",
      "text": " Máy phát mini: quay khung $\\Rightarrow d\\Phi/dt\\Rightarrow$ dòng nạp/LED."
    }
  ],
  "visual": {
    "html": "<p><strong>Ba thí nghiệm Faraday.</strong> (1) Nam châm $\\leftrightarrow$ ống dây. (2) Đổi diện tích vòng. (3) Đổi góc $\\vec{B}$–pháp tuyến. Cùng nguyên nhân: $d\\Phi/dt$.</p><p><strong>Đọc chiều Lenz.</strong> Tăng diện tích trong $B$ vào giấy $\\Rightarrow$ dòng tạo $B$ ra giấy.</p><p><strong>Ứng dụng.</strong> Máy phát; bếp từ (Foucault đáy nồi); phanh điện từ; micro động; đàn guitar điện; đèn quay tay.</p>"
  },
  "mcq": [
    {
      "level": "NB",
      "stem": "Hiện tượng cảm ứng điện từ xảy ra khi",
      "choices": {
        "A": "từ thông qua mạch kín biến đổi",
        "B": "có $B$ không đổi qua mạch đứng yên",
        "C": "chỉ có điện trường tĩnh",
        "D": "dây không có điện tích"
      },
      "answer": "A",
      "whyCorrect": "Từ thông móc vòng biến đổi tạo suất điện động cảm ứng theo Faraday. Chỉ khi có đường dẫn kín và điều kiện mạch phù hợp mới có dòng dẫn cảm ứng.",
      "whyWrong": {
        "B": "Có $\\Phi$ không đổi $\\Rightarrow\\mathcal{E}=0$.",
        "C": "Tĩnh điện module 1.",
        "D": "Không liên quan."
      }
    },
    {
      "level": "NB",
      "stem": "Định luật Lenz nói dòng cảm ứng",
      "choices": {
        "A": "chống nguyên nhân sinh ra nó",
        "B": "luôn ngược $\\vec{B}$ sẵn có",
        "C": "cùng chiều $I$ nguồn mọi lúc",
        "D": "không có chiều xác định"
      },
      "answer": "A",
      "whyCorrect": "Phát biểu bài giảng. Dấu trừ trong $\\mathcal{E}=-d\\Phi/dt$.",
      "whyWrong": {
        "B": "Khi $\\Phi$ giảm thì $B$ cảm ứng cùng chiều $B$ cũ.",
        "C": "Không.",
        "D": "Có quy tắc."
      }
    },
    {
      "level": "NB",
      "stem": "Suất điện động cảm ứng của một vòng dây, với Φ là từ thông qua vòng và chiều vòng/pháp tuyến theo bàn tay phải, là",
      "choices": {
        "A": "$\\mathcal{E}=-d\\Phi/dt$",
        "B": "$\\mathcal{E}=+\\Phi$",
        "C": "$\\mathcal{E}=LI$",
        "D": "$\\mathcal{E}=q/C$"
      },
      "answer": "A",
      "whyCorrect": "Công thức (3.1). Trị số bằng tốc độ biến thiên từ thông, trái dấu.",
      "whyWrong": {
        "B": "Thiếu đạo hàm.",
        "C": "LI là từ thông móc vòng đối với cuộn tuyến tính, đơn vị Wb; suất điện động có đơn vị V.",
        "D": "Tụ."
      }
    },
    {
      "level": "TH",
      "stem": "Dòng Foucault (Fucô) là",
      "choices": {
        "A": "dòng xoáy trong khối dẫn đặt trong $B$ biến thiên",
        "B": "dòng trong dây siêu mỏng chỉ",
        "C": "dòng dịch Maxwell",
        "D": "dòng trong điện môi lý tưởng không có $E$"
      },
      "answer": "A",
      "whyCorrect": "Vật dẫn kích thước lớn, $B(t)$ đổi. Bếp từ, phanh, lõi biến áp.",
      "whyWrong": {
        "B": "Không đủ.",
        "C": "Module 4, $J_d=\\partial D/\\partial t$.",
        "D": "Sai."
      }
    },
    {
      "level": "TH",
      "stem": "Cuộn tuyến tính có từ thông móc vòng $\\Psi=N\\Phi$, độ tự cảm $L=\\Psi/i$. L = 1 H nghĩa là",
      "choices": {
        "A": "Dòng 1 A tạo từ thông móc vòng 1 Wb",
        "B": "Hiệu điện thế 1 V tạo cảm ứng từ 1 T",
        "C": "Điện tích 1 C trên hiệu điện thế 1 V",
        "D": "Cuộn luôn trữ năng lượng 1 J"
      },
      "answer": "A",
      "whyCorrect": "$1\\,\\mathrm H=1\\,\\mathrm{Wb/A}=1\\,\\mathrm{V\\,s/A}$. Với nhiều vòng, phải dùng $\\Psi=N\\Phi$, không chỉ từ thông một vòng.",
      "whyWrong": {
        "B": "Tesla là đơn vị B; còn thiếu thời gian và hình học để liên hệ với suất điện động.",
        "C": "Đây là 1 farad, đơn vị điện dung.",
        "D": "Năng lượng còn phụ thuộc dòng: W = LI²/2."
      }
    },
    {
      "level": "TH",
      "stem": "$\\mathcal{E}_{\\mathrm{tc}}=-L di/dt$. $L$ lớn nghĩa là",
      "choices": {
        "A": "chống mạnh sự đổi dòng (quán tính điện)",
        "B": "$\\mathcal{E}$ nhỏ với cùng $di/dt$",
        "C": "không bao giờ có tia lửa khi ngắt",
        "D": "$\\Phi=0$"
      },
      "answer": "A",
      "whyCorrect": "$|\\mathcal{E}|=L|di/dt|$ lớn. Đóng mạch: dòng trễ; ngắt: quá áp.",
      "whyWrong": {
        "B": "Ngược.",
        "C": "Ngắt dễ tia lửa.",
        "D": "Trong mô hình cuộn cảm tuyến tính, từ thông móc vòng Ψ = NΦ = Li. Suất điện động tự cảm phụ thuộc tốc độ biến thiên dòng: |e| = L|di/dt|."
      }
    },
    {
      "level": "VD",
      "stem": "Một vòng cố định diện tích $A=0{,}50$ m$^2$, B đều vuông góc mặt vòng và tăng đơn điệu $0{,}020$ T trong $0{,}10$ s. Độ lớn suất điện động trung bình là",
      "choices": {
        "A": "$0{,}10$ V",
        "B": "$2{,}5$ V",
        "C": "$0{,}001$ V",
        "D": "$10$ V"
      },
      "answer": "A",
      "whyCorrect": "$|\\mathcal{E}|=A|\\Delta B|/\\Delta t=0{,}50\\cdot 0{,}020/0{,}10=0{,}10$ V.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}10$ V.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}10$ V.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}10$ V."
      }
    },
    {
      "level": "VD",
      "stem": "$L=0{,}40$ H, $di/dt=5$ A/s. $|\\mathcal{E}_{\\mathrm{tc}}|$",
      "choices": {
        "A": "$2{,}0$ V",
        "B": "$0{,}080$ V",
        "C": "$8{,}0$ V",
        "D": "$0{,}40$ V"
      },
      "answer": "A",
      "whyCorrect": "$|\\mathcal{E}|=L|di/dt|=2{,}0$ V.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $2{,}0$ V.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $2{,}0$ V.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $2{,}0$ V."
      }
    },
    {
      "level": "VD",
      "stem": "Máy phát: $N=100$, $B=0{,}20$ T, $A=0{,}010$ m$^2$, $\\omega=50$ rad/s. Biên độ $\\mathcal{E}_0=NBA\\omega$",
      "choices": {
        "A": "$10$ V",
        "B": "$1{,}0$ V",
        "C": "$100$ V",
        "D": "$0{,}10$ V"
      },
      "answer": "A",
      "whyCorrect": "$100\\cdot 0{,}20\\cdot 0{,}010\\cdot 50=10$ V. Đủ bốn thừa số, kể cả $\\omega$.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $10$ V.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $10$ V.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $10$ V."
      }
    },
    {
      "level": "TH",
      "stem": "Bếp từ nấu được vì",
      "choices": {
        "A": "dòng xoáy Foucault trong đáy nồi dẫn từ, $B(t)$ của cuộn dưới bếp",
        "B": "chỉ dẫn nhiệt từ mặt kính",
        "C": "Coulomb tĩnh trên nước",
        "D": "ánh sáng hồng ngoại từ cuộn"
      },
      "answer": "A",
      "whyCorrect": "Bài giảng 3.2.4: $B$ biến thiên $\\to$ dòng xoáy $\\to$ nhiệt Joule đáy nồi.",
      "whyWrong": {
        "B": "Kính bếp không phải nguồn nhiệt chính.",
        "C": "Tĩnh điện.",
        "D": "Không phải nguyên lý chính."
      }
    },
    {
      "level": "TH",
      "stem": "Nam châm N tiến tới vòng kín. Mặt vòng đối diện nam châm đóng vai",
      "choices": {
        "A": "cực N (đẩy nam châm tới)",
        "B": "cực S (hút tới)",
        "C": "không từ",
        "D": "cực N khi rút ra"
      },
      "answer": "A",
      "whyCorrect": "Lenz: chống tăng $\\Phi$ $\\Rightarrow$ đẩy. Rút ra thì hút.",
      "whyWrong": {
        "B": "Đó là khi rút (giảm $\\Phi$).",
        "C": "Có $B$ cảm ứng.",
        "D": "Đảo hai pha."
      }
    },
    {
      "level": "VD",
      "stem": "Hỗ cảm $M=0{,}05$ H, $I_1=4t$ (A, $t$ giây). $|\\mathcal{E}_2|$",
      "choices": {
        "A": "$0{,}20$ V",
        "B": "$0{,}05$ V",
        "C": "$4{,}0$ V",
        "D": "$0$"
      },
      "answer": "A",
      "whyCorrect": "$dI_1/dt=4$ A/s, $\\mathcal{E}_2=M|dI/dt|=0{,}20$ V.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}20$ V.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}20$ V.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}20$ V."
      }
    },
    {
      "level": "VD",
      "stem": "Năng lượng ống dây $L=0{,}20$ H, $I=3$ A",
      "choices": {
        "A": "$0{,}90$ J",
        "B": "$1{,}80$ J",
        "C": "$0{,}30$ J",
        "D": "$6{,}0$ J"
      },
      "answer": "A",
      "whyCorrect": "$W=\\frac12 LI^2=0{,}5\\cdot 0{,}20\\cdot 9=0{,}90$ J.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}90$ J.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}90$ J.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}90$ J."
      }
    },
    {
      "level": "VDC",
      "stem": "Đèn quay tay (hand-crank) sáng vì",
      "choices": {
        "A": "máy phát: quay khung $\\Rightarrow d\\Phi/dt\\Rightarrow$ suất điện động",
        "B": "pin hóa học trong tay quay",
        "C": "chỉ ma sát tạo tĩnh điện Coulomb đủ sáng LED",
        "D": "cộng hưởng quang học"
      },
      "answer": "A",
      "whyCorrect": "Máy phát mini + chỉnh lưu/tụ. Không cần pin.",
      "whyWrong": {
        "B": "Không phải nguyên lý crank.",
        "C": "Không đủ và không ổn định như cảm ứng.",
        "D": "Sai module."
      }
    },
    {
      "level": "TH",
      "stem": "Một vòng dẫn có khe cách điện nhỏ, từ thông biến thiên chậm; bỏ điện dung khe và hiệu ứng quá độ. Kết luận nào đúng?",
      "choices": {
        "A": "có $\\mathcal{E}$, không có dòng bền",
        "B": "không có $\\mathcal{E}$ vì hở",
        "C": "$I$ lớn hơn khi kín",
        "D": "$L=0$"
      },
      "answer": "A",
      "whyCorrect": "Định luật Faraday vẫn cho suất điện động quanh đường vòng. Khe hở ngăn dòng dẫn liên tục. Điện áp đo trong trường biến thiên còn phụ thuộc đường dây đo; không đồng nhất tùy ý với hiệu điện thế tĩnh.",
      "whyWrong": {
        "B": "Sai phổ biến.",
        "C": "Hở $I=0$.",
        "D": "Không."
      }
    },
    {
      "level": "VDC",
      "stem": "Hiệu ứng mặt da (skin) với dòng xoáy / AC cao tần",
      "choices": {
        "A": "dòng dồn sát bề mặt dẫn, tăng điện trở hiệu dụng",
        "B": "dòng chỉ ở tâm dây",
        "C": "tắt Foucault",
        "D": "không liên quan $dB/dt$"
      },
      "answer": "A",
      "whyCorrect": "Từ trường AC cảm ứng dòng ngược trong lòng dẫn $\\Rightarrow$ dòng dồn ra da. Bếp từ / lõi ferrite.",
      "whyWrong": {
        "B": "Ngược.",
        "C": "Chính là họ Foucault.",
        "D": "Có."
      }
    },
    {
      "level": "TH",
      "stem": "Micro động (bài giảng) biến âm $\\to$ điện nhờ",
      "choices": {
        "A": "màng + cuộn trong $B$: dao động $\\Rightarrow d\\Phi/dt$",
        "B": "chỉ pin $9$ V không cuộn",
        "C": "O-G điện tích màng",
        "D": "Malus"
      },
      "answer": "A",
      "whyCorrect": "Màng làm cuộn dây chuyển động trong từ trường khe nam châm, sinh suất điện động chuyển động $\\mathcal E=\\int(\\vec v\\times\\vec B)\\cdot d\\vec\\ell$. Có thể mô tả bằng biến thiên từ thông qua mạch; không phải chỉ do khoảng cách đến nam châm đổi.",
      "whyWrong": {
        "B": "Cần cảm ứng.",
        "C": "Nhầm tĩnh điện.",
        "D": "Quang."
      }
    },
    {
      "level": "VD",
      "stem": "$\\mathcal{E}=B\\ell v$ (thanh trượt vuông góc). $B=0{,}30$ T, $\\ell=0{,}40$ m, $v=5$ m/s",
      "choices": {
        "A": "$0{,}60$ V",
        "B": "$0{,}12$ V",
        "C": "$6{,}0$ V",
        "D": "$0$"
      },
      "answer": "A",
      "whyCorrect": "Ba đại lượng vuông góc: $0{,}30\\cdot 0{,}40\\cdot 5=0{,}60$ V.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}60$ V.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}60$ V.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $0{,}60$ V."
      }
    },
    {
      "level": "NB",
      "stem": "Một vòng phẳng diện tích A trong B đều; $\\theta$ là góc giữa B và pháp tuyến có hướng. Từ thông Φ là",
      "choices": {
        "A": "đơn vị weber; $\\Phi=BA\\cos\\theta$",
        "B": "đơn vị tesla",
        "C": "luôn $=0$ nếu có $B$",
        "D": "vectơ cùng $B$"
      },
      "answer": "A",
      "whyCorrect": "Vô hướng. $1\\,\\mathrm{V}=1\\,\\mathrm{Wb/s}$.",
      "whyWrong": {
        "B": "Đó là $B$.",
        "C": "Sai.",
        "D": "Vô hướng."
      }
    },
    {
      "level": "TH",
      "stem": "Phanh điện từ (bài giảng) dựa trên",
      "choices": {
        "A": "Lenz: dòng xoáy $\\times B$ cản chuyển động đĩa",
        "B": "ma sát khô chỉ",
        "C": "công thoát",
        "D": "Young"
      },
      "answer": "A",
      "whyCorrect": "Vào từ trường: tăng $\\Phi$ $\\Rightarrow$ lực cản. Ra: vẫn cản theo Lenz.",
      "whyWrong": {
        "B": "Không phải chính.",
        "C": "Module 6.",
        "D": "Module 5."
      }
    },
    {
      "level": "VD",
      "stem": "Dây thẳng $I$ không đổi, vòng nằm yên phẳng chứa dây (dây không cắt vòng). $\\mathcal{E}$ trong vòng",
      "choices": {
        "A": "$0$ vì $\\Phi$ không đổi",
        "B": "lớn vì có $B$",
        "C": "Khác 0 ngay cả khi từ thông không đổi",
        "D": "bằng $LI$"
      },
      "answer": "A",
      "whyCorrect": "$I$ không đổi, hình học cố định $\\Rightarrow d\\Phi/dt=0$. Sách hay gài “có $B$ là có dòng”.",
      "whyWrong": {
        "B": "Có $B$ không đủ.",
        "C": "Vòng đứng yên, nguồn dòng không đổi nên không có suất điện động cảm ứng.",
        "D": "Không tự cảm biến thiên."
      }
    },
    {
      "level": "VDC",
      "stem": "Sạc không dây / bếp từ giống nhau ở chỗ",
      "choices": {
        "A": "hỗ cảm: $dI_1/dt$ (hoặc $B$ AC) sinh $\\mathcal{E}_2$; $B$ tĩnh không sạc",
        "B": "Coulomb tĩnh giữa hai bản",
        "C": "chỉ LED quang điện",
        "D": "không cần kim loại / cuộn"
      },
      "answer": "A",
      "whyCorrect": "$\\mathcal{E}_2=-M dI_1/dt$. Tần số kHz–MHz.",
      "whyWrong": {
        "B": "Tụ.",
        "C": "Module 6.",
        "D": "Cần cuộn/đáy dẫn."
      }
    },
    {
      "level": "TH",
      "stem": "Trong mô hình máy phát gồm nam châm đứng yên và khung dây quay, phát biểu đúng về phần cảm và phần ứng là",
      "choices": {
        "A": "nam châm tạo $B$; cuộn quay đổi góc $\\Rightarrow d\\Phi/dt$",
        "B": "cả hai là tụ",
        "C": "phần ứng là pin",
        "D": "không cần quay nếu $B$ tĩnh và góc cố định"
      },
      "answer": "A",
      "whyCorrect": "Bài giảng Hình 3.5. Góc pháp tuyến–$B$ đổi.",
      "whyWrong": {
        "B": "Sai.",
        "C": "Sai.",
        "D": "Góc cố định + $B$ tĩnh $\\Rightarrow\\mathcal{E}=0$."
      }
    },
    {
      "level": "NB",
      "stem": "Vòng dây kín thuần trở R không đổi, bỏ tự cảm và quá độ; chiều vòng/pháp tuyến theo bàn tay phải. Phát biểu nào <strong>sai</strong>?",
      "choices": {
        "A": "dòng cảm ứng chỉ tồn tại khi từ thông đang biến đổi",
        "B": "Độ lớn dòng cảm ứng bằng tốc độ biến thiên từ thông chia cho R",
        "C": "$\\mathcal{E}=+d\\Phi/dt$ (bỏ Lenz) là công thức mang dấu bài giảng",
        "D": "chiều dòng phụ thuộc tăng hay giảm $\\Phi$"
      },
      "answer": "C",
      "whyCorrect": "C sai dấu: $\\mathcal E=-d\\Phi/dt$. Trong mô hình thuần trở đang xét, $I=\\mathcal E/R$. Nếu có tự cảm đáng kể, dòng có thể còn tồn tại sau khi từ thông ngoài ngừng đổi; không áp dụng A/B vô điều kiện.",
      "whyWrong": {
        "A": "Đúng (ii).",
        "B": "Đúng (iii).",
        "D": "Đúng (iv)."
      }
    }
  ],
  "essays": [
    {
      "kind": "TN Faraday",
      "title": "Thí nghiệm Faraday (DCCT)",
      "problem": "<p>Nêu ba cách thay đổi từ thông qua một vòng và viết định luật Faraday cho N vòng. Cuộn $N=200$, diện tích mỗi vòng $A=4$ cm$^2$, ban đầu B đều $0{,}05$ T vuông góc mặt vòng, sau $0{,}20$ s giảm đơn điệu về 0. Ước độ lớn suất điện động trung bình.</p>",
      "tip": "Đổi cm$^2$. $|\\mathcal{E}|=N\\Delta\\Phi/\\Delta t$.",
      "steps": {
        "s1": "<p>(1) Nam châm–ống (2) đổi $A$ (3) đổi góc. Cùng $d\\Phi/dt$.</p>",
        "s2": "<p>$A=4\\times 10^{-4}$ m$^2$, $\\Delta B=0{,}05$ T, $\\Delta t=0{,}20$ s.</p>",
        "s3": "<p>Từ thông mỗi vòng $\\Phi=BA\\cos\\theta$; móc vòng $\\Psi=N\\Phi$. $|\\mathcal E_{tb}|=N|\\Delta\\Phi|/\\Delta t=NA|\\Delta B|/\\Delta t$.</p>",
        "s4": "<p>$|\\mathcal{E}|=200\\cdot 4\\times 10^{-4}\\cdot 0{,}05/0{,}20=0{,}020$ V.</p>"
      }
    },
    {
      "kind": "Lenz",
      "title": "Chiều dòng khi tăng diện tích",
      "problem": "<p>$\\vec{B}$ vào giấy, thanh trượt kéo làm $A$ tăng. Xác định chiều dòng.</p>",
      "tip": "Tăng $\\Phi$ vào $\\Rightarrow$ $B$ cảm ứng ra.",
      "steps": {
        "s1": "<p>$\\Phi$ vào giấy tăng.</p>",
        "s2": "<p>Pháp tuyến vào giấy theo $B$.</p>",
        "s3": "<p>Nhìn trực diện mặt giấy, B hướng vào trang. Lenz yêu cầu từ trường cảm ứng hướng ra trang để chống sự tăng từ thông vào. Quy tắc nắm tay phải cho dòng ngược chiều kim đồng hồ.</p>",
        "s4": "<p>Kết: ngược chiều kim đồng hồ (quy ước nhìn $B$ vào giấy).</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Bếp từ",
      "problem": "<p>Với bếp từ gia dụng thiết kế cho đáy nhiễm từ, giải thích vì sao nồi sắt từ phù hợp hơn nồi nhôm thông thường; tần số khoảng 25 kHz.</p>",
      "tip": "Foucault + $\\mu$ + điện trở đáy.",
      "steps": {
        "s1": "<p>Cuộn dưới bếp: $I$ AC $\\Rightarrow B(t)$.</p>",
        "s2": "<p>Tần số kHz; đáy dẫn.</p>",
        "s3": "<p>$\\mathcal{E}\\propto d\\Phi/dt$; $P=I^2 R$ xoáy. Sắt: $\\mu$ lớn, $\\Phi$ lớn, tổn hao lớn. Nhôm: $\\mu\\approx 1$, thiết kế bếp khác.</p>",
        "s4": "<p>Định tính: chọn đáy ferro + phẳng. Mặt da ở kHz: nhiệt sát đáy.</p>"
      }
    },
    {
      "kind": "Tự cảm",
      "title": "Đóng/ngắt cuộn",
      "problem": "<p>$L=0{,}40$ H, dòng tăng $0\\to 2$ A trong $10$ ms. Tính $|\\mathcal{E}_{\\mathrm{tc}}|$ trung bình và $W$ lúc $2$ A.</p>",
      "tip": "$W=\\frac12 LI^2$.",
      "steps": {
        "s1": "<p>Tự cảm chống tăng $I$.</p>",
        "s2": "<p>$\\Delta t=0{,}010$ s, $\\Delta I=2$ A.</p>",
        "s3": "<p>$|\\mathcal{E}|=L\\Delta I/\\Delta t$, $W=\\frac12 LI^2$.</p>",
        "s4": "<p>$|\\mathcal{E}|=80$ V; $W=0{,}80$ J.</p>"
      }
    },
    {
      "kind": "Máy phát",
      "title": "Khung quay",
      "problem": "<p>$N=100$, $A=0{,}01$ m$^2$, $B=0{,}20$ T, $f=50$ Hz. Tính $\\mathcal{E}_0$.</p>",
      "tip": "$\\omega=2\\pi f$.",
      "steps": {
        "s1": "<p>Máy phát xoay chiều.</p>",
        "s2": "<p>$\\omega=2\\pi\\cdot 50=100\\pi$ rad/s.</p>",
        "s3": "<p>$\\mathcal{E}_0=NBA\\omega$.</p>",
        "s4": "<p>$\\mathcal{E}_0=100\\cdot 0{,}2\\cdot 0{,}01\\cdot 100\\pi\\approx 62{,}8$ V.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Đèn quay tay + phanh điện",
      "problem": "<p>Hai ứng dụng Lenz: (1) crank lamp (2) phanh đĩa kim loại trong $B$.</p>",
      "tip": "Một cái lấy điện hữu ích, một cái biến cơ $\\to$ nhiệt xoáy.",
      "steps": {
        "s1": "<p>(1) Quay khung lấy $\\mathcal{E}$. (2) Đĩa vào $B$: $d\\Phi/dt$ trong khối.</p>",
        "s2": "<p>Cùng SI volt, watt.</p>",
        "s3": "<p>Lenz: (1) khó quay khi LED tải (phản moment). (2) lực cản phanh.</p>",
        "s4": "<p>Kết: cùng $-d\\Phi/dt$, khác chỗ dùng năng lượng.</p>"
      }
    }
  ]
});
